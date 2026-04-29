import React from "react";
import { CS_SUBJECTS } from "../../constants/questions";
import styles from "./CSSubjectPanel.module.css";

const CS_TOPICS = {
  dbms:    ["ER Model","Normalization","SQL Joins","Transactions","ACID","Indexing","NoSQL vs SQL","Stored Procedures"],
  os:      ["Process vs Thread","Scheduling Algorithms","Deadlock","Memory Management","Paging","Semaphores","File Systems","Virtual Memory"],
  cn:      ["OSI Model","TCP vs UDP","HTTP/HTTPS","DNS","Routing Algorithms","Subnetting","Firewalls","Socket Programming"],
  oops:    ["Encapsulation","Abstraction","Inheritance","Polymorphism","SOLID Principles","Design Patterns","Abstract vs Interface","Composition vs Inheritance"],
  sql:     ["SELECT Queries","JOINs","GROUP BY","Subqueries","Window Functions","Indexes","Transactions","Stored Procedures"],
  system:  ["Load Balancing","Caching","Database Sharding","CAP Theorem","Microservices","Message Queues","Rate Limiting","Consistent Hashing"],
  aptitude:["Number System","Percentages","Time & Work","Probability","Logical Reasoning","Data Interpretation","Verbal Ability","Coding Decoding"],
  hr:      ["Tell me about yourself","Strengths & Weaknesses","Why this company?","5-year plan","Conflict resolution","Leadership example","Teamwork","Salary negotiation"],
};

export default function CSSubjectPanel({ csProgress, onUpdateProgress }) {
  return (
    <div className={styles.grid}>
      {CS_SUBJECTS.map((subject) => {
        const done  = csProgress[subject.id] ?? 0;
        const total = subject.totalQ;
        const pct   = Math.round((done / total) * 100);
        const topics = CS_TOPICS[subject.id] ?? [];

        return (
          <div key={subject.id} className={styles.card} style={{ "--c": subject.color }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardLeft}>
                <span className={styles.cardIcon}>{subject.icon}</span>
                <div>
                  <span className={styles.cardTitle}>{subject.label}</span>
                  <span className={styles.cardSub}>{done} / {total} questions</span>
                </div>
              </div>
              <span className={styles.cardPct} style={{ color: subject.color }}>{pct}%</span>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%`, background: subject.color }} />
            </div>

            <div className={styles.controls}>
              <button className={styles.ctrlBtn} onClick={() => onUpdateProgress(subject.id, done - 5)}>−5</button>
              <button className={styles.ctrlBtn} onClick={() => onUpdateProgress(subject.id, done - 1)}>−1</button>
              <span className={styles.ctrlVal}>{done}</span>
              <button className={styles.ctrlBtn} onClick={() => onUpdateProgress(subject.id, done + 1)}>+1</button>
              <button className={styles.ctrlBtn} onClick={() => onUpdateProgress(subject.id, done + 5)}>+5</button>
            </div>

            <div className={styles.topicChips}>
              {topics.map((t) => (
                <span key={t} className={styles.chip}>{t}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
