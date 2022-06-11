import Input from "../../Common/TextInput/Textinput";

const addproduct = () => {
  return (
    <>
      <h1>Creat Product</h1>
      <Input type="text" label="product name" />
      <Input type="text" label="Product Description" />
      <Input type="text" label="Category" />
      <Input type="text" label="Price" />
      <Input type="text" label="In Stock Quanity" />
      <Input type="text" label="Add Image Link" />
    </>
  );
};

export default addproduct;
