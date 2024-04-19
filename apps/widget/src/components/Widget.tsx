import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { WidgetProps } from "$interfaces/task";
import { priorityColors, formatDueDate } from "$utils";
import styles from "$styles/modules/widget.module.scss";

// eslint-disable-next-line no-unused-vars
const Widget: React.FC<WidgetProps> = ({ userId, borderRadius, headerColor, bodyColor, textColor, accentColor, dueDates, priorityLevels, hideCompleted, userData, errorMsg }) => {

  const filteredTasks = hideCompleted ? userData.filter(item => !item.completed) : userData;
  const remainingTasksCount = filteredTasks.length > 3 ? filteredTasks.length - 3 : 0;

  return (
    <div className={styles.main}>
      <div className={styles.widgetWrapper} style={{ borderRadius: borderRadius ? "25px" : "0px", backgroundImage: `linear-gradient(0deg, ${bodyColor} 72%, ${headerColor} 72%)`, color: textColor ?? "#eaefff" }}>
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeader}>
            <h2 className={styles.widgetHeading}>My Tasks <span className={styles.taskCount} style={{ color: accentColor ?? "#f5e48b" }}>{userData.length}</span></h2>
            <Link href="https://vbusy.vercel.app/login" target="_blank" rel="noopener noreferrer">
              <Image className={styles.widgetIcon} src="/bee.png" alt="Vbusy Widget Icon" width={40} height={40} />
            </Link>
          </div>
          <div className={styles.widgetBody}>
            {errorMsg ? (
              <p className={styles.invalidBody}>{errorMsg}</p>
            ) : (
              <ul className={styles.taskBody}>
                {
                  filteredTasks.length === 0
                    ? (
                      <p style={{ opacity: "40%", fontStyle: "italic" }}>You don't have any tasks! :D</p>
                    ) : (
                      <div>
                        {filteredTasks.slice(0, 3).map((item, index) => (
                          (!hideCompleted || !item.completed) && (
                            <div key={index}>
                              <div className={styles.taskContent}>
                                <li className={styles.taskItem} key={index}>
                                  {priorityLevels &&
                                    <span className={styles.priorityLevelDot} style={{ background: priorityColors[item.priority] }}></span>
                                  }
                                  <p className={`${item.completed ? styles.completed : ""} ${styles.widgetHeading}`}>{item.task}</p>
                                </li>
                                {dueDates &&
                                  <p style={{ color: moment(item.dueDate).isBefore(moment()) ? '#ed8796' : 'inherit' }}>
                                    {formatDueDate(item.dueDate)}
                                  </p>
                                }
                              </div>
                              {index !== 2 && <hr />}
                            </div>
                          )
                        ))}
                      </div>
                    )
                }

                {remainingTasksCount > 0 && (
                  <span className={styles.remainingTasks}>
                    + {remainingTasksCount} more task{remainingTasksCount > 1 ? "s" : ""}
                  </span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
