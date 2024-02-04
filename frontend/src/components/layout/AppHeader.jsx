import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/CryptoContext";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

// const options: SelectProps['options'] = [
//   {
//     label: 'China',
//     value: 'china',
//     emoji: '🇨🇳',
//     desc: 'China (中国)',
//   },
//   {
//     label: 'USA',
//     value: 'usa',
//     emoji: '🇺🇸',
//     desc: 'USA (美国)',
//   },
//   {
//     label: 'Japan',
//     value: 'japan',
//     emoji: '🇯🇵',
//     desc: 'Japan (日本)',
//   },
//   {
//     label: 'Korea',
//     value: 'korea',
//     emoji: '🇰🇷',
//     desc: 'Korea (韩国)',
//   },
// ];

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return document.removeEventListener("keypress", keypress);
  }, []);
  function handleSelect(value) {
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        onClick={() => setSelect((prevState) => !prevState)}
        open={select}
        style={{ width: 250 }}
        value={"press / to open"}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
