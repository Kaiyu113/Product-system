import { Modal } from "antd";
import "antd/dist/antd.css";

const MyModal = ({ children, visible, onCancel }) => {
  return (
    <>
      <Modal
        width={393}
        title={null}
        visible={visible}
        footer={null}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
