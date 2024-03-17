import express, { Request, Response, NextFunction, Router } from "express";
import { createLabelSchema, getLabelSchema, updateLabelSchema } from "../validators/label.js";
import { Controller } from "../interfaces/controller.js";
import Label from "../models/label.js";
import protect from "../middleware/auth.js";
import Log from "../utils/logActivity.js";

class LabelController implements Controller {
  public path = "/api/v1/labels";
  public router: express.Router = Router();
  private labelModel = Label;
  private logActivity = Log;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, protect, this.createLabel);
    this.router.get(`${this.path}/:labelId`, protect, this.getLabel);
    this.router.get(`${this.path}`, protect, this.getAllLabels);
    this.router.delete(`${this.path}/:labelId`, protect, this.deleteLabel);
    this.router.delete(`${this.path}`, protect, this.deleteAllLabels);
    this.router.put(`${this.path}/:labelId`, protect, this.updateLabel);
  }

  private createLabel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createLabelSchema.validate({
        name: req.body.name,
        color: req.body.color,
      });

      if (error) {
        return res.status(400).send({ error: error.message });
      }

      const { name, color } = value;

      const saveLabel = await this.labelModel.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            labels: {
              name,
              color,
            },
          }
        },
        {
          upsert: true,
          new: true,
        }
      );

      await this.logActivity(req.user._id, "create", "Create a new label", name);

      return res.status(200).json(saveLabel);
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  private getLabel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = getLabelSchema.validate(req.params);
      if (error) {
        return res.status(400).send({ error: error.message });
      }

      const label = await this.labelModel.findOne({
        user: req.user._id, "labels._id": value.labelId
      });

      return res.status(200).json(label);
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  private getAllLabels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const labels = await this.labelModel.find({ user: req.user._id });
      return res.status(200).json(labels);
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  private deleteLabel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = getLabelSchema.validate(req.params);
      if (error) {
        return res.status(400).send({ error: error.message });
      }

      const label = await this.labelModel.updateOne(
        { user: req.user._id, "labels._id": value.labelId  },
        {
          $pull: {
            labels: {
              _id: value.labelId
            }
          }
        }
      );

      if (!label) {
        return res.status(404).send({ error: "Label not found" });
      }

      await this.logActivity(req.user._id, "delete", "Delete a label");

      return res.status(200).json({ message: "Successfully deleted label!" });
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  private deleteAllLabels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.labelModel.updateOne(
        { user: req.user._id },
        {
          labels: [],
        }
      );

      await this.logActivity(req.user._id, "purge", "Purged all labels");

      return res.status(200).json({ message: "Successfully purged labels!" });
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }

  private updateLabel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = updateLabelSchema.validate({
        labelId: req.params.labelId,
        name: req.body.name,
        color: req.body.color,
      });
      if (error) {
        return res.status(400).send({ error: error.message });
      }

      const updatedLabel = await this.labelModel.findOneAndUpdate(
        { user: req.user._id, "labels._id": value.labelId },
        {
          $set: {
            "labels.$.name": req.body.name,
            "labels.$.color": req.body.color,
          }
        },
        {
          new: true,
        }
      );

      if (!updatedLabel) {
        return res.status(404).send({ error: "Label not found" });
      }

      await this.logActivity(req.user._id, "update", "Updated a label",);

      return res.status(200).json(updatedLabel);
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }
}

export default LabelController;
