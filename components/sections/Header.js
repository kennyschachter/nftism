import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@components/ui/ConnectButton";
import useWindowSize from "../../hooks/useWindowSize";
import closeIcon from "../../public/close-icon.svg";
import hamburgerIcon from "../../public/hamburger-icon.svg";
import logo from "../../public/logo.svg";
import styles from "./Header.module.css";

const Header = ({ value: { showDropdown, setShowDropdown } }) => {
  const { width } = useWindowSize();

  return (
    <div className={styles.header}>
      {width > 1200 ? (
        <>
          <div>
            <div className={styles.link}>
              <Link href="/">HOME</Link>
            </div>
            <div className={styles.link}>
              <Link href="https://www.kennyschachter.art/">ARCHIVE</Link>
            </div>
            <div className={styles.link}>
              <Link href="https://www.dextools.io/app/ether/pair-explorer/0x265e4776011d61b52e9ab37827590ab7efbdae89">
                PRICE
              </Link>
            </div>
            <div className={styles.link}>
              <Link href="https://app.sushi.com/swap?outputCurrency=0xf8fe4dbe106ac2a1e6c96c3ca77b344a1b1a49e1">
                BUY NFTISM
              </Link>
            </div>
            <div className={styles.link}>
              <p>MERCH</p>
            </div>
          </div>
          <div className={styles.logo}>
            <p>
              <Image src={logo} alt="Nftism" />
            </p>
          </div>
          <div>
            <div className={styles.link}>
              <p>PRIZE</p>
            </div>
            <div className={styles.link}>
              <p>ADD TO WALLET</p>
            </div>
            <div className={styles.link}>
              <Link href="/raffle">RAFFLES</Link>
            </div>
            <ConnectButton buttonClass={`${styles.link} ${styles.btn}`} />
          </div>
        </>
      ) : (
        <>
          <>
            {showDropdown ? (
              <div
                className={styles.icon}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image src={closeIcon} alt="Close Icon" />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image src={hamburgerIcon} alt="Hamburger Icon" />
              </div>
            )}
            {showDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.link}>
                  <Link href="/">HOME</Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://www.kennyschachter.art/">ARCHIVE</Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://www.dextools.io/app/ether/pair-explorer/0x265e4776011d61b52e9ab37827590ab7efbdae89">
                    PRICE
                  </Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://app.sushi.com/swap?outputCurrency=0xf8fe4dbe106ac2a1e6c96c3ca77b344a1b1a49e1">
                    BUY NFTISM
                  </Link>
                </div>
                <div className={styles.link}>
                  <p>MERCH</p>
                </div>
                <div className={styles.link}>
                  <p>PRIZE</p>
                </div>
                <div className={styles.link}>
                  <p>ADD TO WALLET</p>
                </div>
                <div className={styles.link}>
                  <Link href="/raffle">RAFFLES</Link>
                </div>
              </div>
            )}
          </>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="Nftism" />
            </Link>
          </div>
          <ConnectButton buttonClass={`${styles.link} ${styles.btn}`} />
        </>
      )}
    </div>
  );
};

export default Header;
