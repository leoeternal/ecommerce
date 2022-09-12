import React, { useEffect, useState } from "react";
import "./addProduct.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { addProduct } from "../../store/ProductAction";
import { productActions } from "../../store/ProductSlice";
import { CircularProgress } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Groceries",
  "Breads and Buns",
  "Essential Kitchen Tools",
  "Masalas & Spices",
  "Milk & Wheat",
  "Ready To Cook & Eat",
  "Choco & Nut Spread",
  "Buns, Pavs & Pizza Base",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddProduct() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [desc, setDesc] = useState("");
  const [features, setFeatures] = useState([]);
  const [tempFeature, setTempFeature] = useState("");
  const [tags, setTags] = useState("");
  const [deliveryDays, setDeliveryDays] = useState(1);
  const [category, setCategory] = useState([]);

  const { productLoader, productAdded } = useSelector((state) => state.product);
  const { adminLoggedStatus } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminLoggedStatus) {
      navigate("/");
    }
  }, [adminLoggedStatus, navigate]);

  useEffect(() => {
    if (productAdded) {
      setName("");
      setSlug("");
      setQuantity(1);
      setPrice(0);
      setMrp(0);
      setDesc("");
      setFeatures([]);
      setCategory([]);
      setTags("");
      dispatch(productActions.updateProductAddedValue());
    }
  }, [productAdded, dispatch]);

  const categoryHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const deliveryDaysHandleChange = (event) => {
    setDeliveryDays(event.target.value);
  };

  const featureHandler = () => {
    if (tempFeature === "") {
      toast.error("Write something");
    } else {
      setFeatures([
        ...features,
        {
          tempFeature,
        },
      ]);
      setTempFeature("");
    }
  };

  const submitHandler = () => {
    if (price > mrp) {
      toast.error("Price cannot be greater than M.R.P");
    } else if (
      name !== "" &&
      desc !== "" &&
      slug !== "" &&
      price !== 0 &&
      mrp !== 0 &&
      tags !== "" &&
      category.length !== 0
    ) {
      dispatch(productActions.updateProductLoaderValue());
      const tagSplit = tags.split(",");
      for (let i = 0; i < tagSplit.length; i++) {
        let count = 0;
        for (let j = 0; j < tagSplit[i].length; j++) {
          if (tagSplit[i][j] === " ") {
            count++;
          }
        }
        for (let k = 0; k < count; k++) {
          tagSplit[i] = tagSplit[i].replace(" ", "");
        }
      }
      dispatch(
        addProduct({
          name,
          desc,
          category,
          slug,
          quantity,
          price,
          mrp,
          features,
          tags: tagSplit,
          deliveryDays,
        })
      );
    } else {
      toast.error("Fill complete details");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="addproduct-wrapper">
        <h1>Add Product</h1>
        <div className="addproduct-form">
          <div className="level1">
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ margin: "0px 5px" }}
              autoComplete="off"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={category}
                onChange={categoryHandleChange}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    style={getStyles(cat, category, theme)}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="level2">
            <TextField
              id="outlined-basic"
              label="Slug"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="level3">
            <TextField
              type="number"
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              fullWidth
              style={{ margin: "0px 5px" }}
              autoComplete="off"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              type="number"
              id="outlined-basic"
              label="Price"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="level33">
            <TextField
              type="number"
              id="outlined-basic"
              label="M.R.P"
              variant="outlined"
              fullWidth
              style={{ margin: "0px 5px" }}
              autoComplete="off"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
            />
          </div>
          <div className="level4">
            <textarea
              autoComplete="off"
              placeholder="Short Description"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="level5">
            <TextField
              id="outlined-basic"
              label="Add feature"
              variant="outlined"
              sx={{ width: "80%", margin: "0 0 10px 0" }}
              autoComplete="off"
              value={tempFeature}
              onChange={(e) => setTempFeature(e.target.value)}
            />
            <AddIcon
              onClick={featureHandler}
              sx={{
                cursor: "pointer",
                fontSize: "25px",
                marginLeft: "10px",
                position: "relative",
                top: "15px",
              }}
            />
            {features.map((feature, index) => {
              return (
                <p id="feature">
                  {index + 1}. {feature.tempFeature}
                </p>
              );
              <br />;
            })}
          </div>
          <div className="level6">
            <TextField
              id="outlined-basic"
              label="Product Tags (Type and make comma to seperate tags)"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="level8">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Delivery Days
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deliveryDays}
                label="Select Delivery Days"
                onChange={deliveryDaysHandleChange}
                style={{ margin: "0px 5px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="button-level">
            {productLoader ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={submitHandler}
                sx={{ margin: "20px 5px", backgroundColor: "red" }}
                variant="contained"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
