import React from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react'
import { set } from 'mongoose'

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: '',
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  function handleChange(event) {
    const {name, value, files } = event.target;
    if (name === 'media') {
        setProduct(prevState => ({...prevState, media: files[0]}));
        try {
          setMediaPreview(window.URL.createObjectURL(files[0]));
        }
        catch(error){
          console.error(error);
        }
    } else 
    {setProduct((prevState) => ({...prevState, [name] : value})); }
  } 

  function handleSubmit(event) {
    event.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return (<>
  <Header as="h2" block>
    <Icon name="add" color="orange"/>
    Create New Product
  </Header>
  <Form success={success} onSubmit={handleSubmit}>
    <Message
      success
      icon="check"
      header="Success!"
      content="Your product has been posted"
    />
    <Form.Group width="equal">
      <Form.Field
        control={Input}
        name="name"
        label="Name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        name="price"
        label="Price"
        placeholder="Price"
        min="0.00"
        step="0.01"
        type="number"
        value={product.price}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        type="file"
        name="media"
        label="Media"
        accept="image/*"
        content="Selet Image"
        onChange={handleChange}
      />
    </Form.Group>
    <Image src={mediaPreview} rounded centered size="small"/>
    <Form.Field
      control={TextArea}
      name="description"
      label="Description"
      placeholder="Description"
      value={product.description}
      onChange={handleChange}
    />
        <Form.Field
      control={Button}
      color="blue"
      icon="pencil alternate"
      content="Submit"
    />
  </Form>
  
  
  
  </>);
}

export default CreateProduct;
