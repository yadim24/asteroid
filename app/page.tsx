import clsx from "clsx";
import Image from "next/image";
import { passionOne } from "./fonts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles["header-wrapper"]}>
        <p className={clsx(styles["logo-name"], passionOne.className)}>
          ARMAGEDON 2023
        </p>
        <div className={styles["logo-text"]}>
          <p>ООО “Команда им. Б. Уиллиса”.</p>
          <p>Взрываем астероиды с 1998 года.</p>
        </div>
      </header>
      <main className={styles.wrapper}>
        <Image
          className={styles.earth}
          src="/zemlia_lg.png"
          alt="earth"
          width={400}
          height={620}
        />

        <div className={styles.grid}>
          <Image
            className={styles.logo}
            src="/asteroid.png"
            alt="asteroid"
            width={53}
            height={58}
          />

          <Image
            className={styles.logo}
            src="/asteroid.png"
            alt="asteroid"
            width={80}
            height={87}
          />
        </div>
      </main>
    </>
  );
}
