import clsx from "clsx";
import Image from "next/image";
import { inter, passionOne } from "./fonts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles["header-wrapper"]}>
        <p className={clsx(styles["logo-name"], passionOne.className)}>
          ARMAGEDDON 2023
        </p>
        <div className={styles["logo-text"]}>
          <p>ООО “Команда им. Б. Уиллиса”.</p>
          <p>Взрываем астероиды с 1998 года.</p>
        </div>
      </header>
      <main className={styles["main-wrapper"]}>
        <Image
          className={styles.earth}
          src="/zemlia_lg.png"
          alt="earth"
          width={400}
          height={620}
          priority
        />

        <div className={styles["container"]}>
          <div className={styles["list-wrapper"]}>
            <h1 className={styles.header}>Ближайшие подлёты астероидов</h1>
            <p className={styles.units}>
              <button className={clsx(styles.kilometers, inter.className)}>
                в километрах
              </button>{" "}
              |{" "}
              <button className={clsx(styles.lunar, inter.className)}>
                в лунных орбитах
              </button>
            </p>
            <div className={styles.list}>
              <div className={styles.asteroid}>
                <h2 className={styles.date}>12 сент 2023</h2>
                <div className={styles["data-container"]}>
                  <div>
                    <p>5 652 334 км</p>
                    <div className={styles["arrow-wrapper"]}>
                      <Image
                        className={styles.arrow}
                        src="/arrow.svg"
                        alt="distance"
                        fill
                        sizes="100vw"
                      />
                    </div>
                  </div>
                  <Image
                    src="/asteroid.png"
                    alt="asteroid"
                    width={22}
                    height={24}
                  />
                  <div>
                    <p className={styles["asteroid-name"]}>2021 FQ</p>
                    <p className={styles.diameter}>Ø 85 м</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
