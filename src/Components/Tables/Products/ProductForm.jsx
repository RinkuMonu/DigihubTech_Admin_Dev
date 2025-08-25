import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Snackbar,
  SnackbarContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Chip,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { apiGet, apiPost, apiPut } from "../../../api/apiMethods";
import { EditNoteOutlined } from "@mui/icons-material";
import { useUser } from "../../../Context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles({
  selectInput: {
    minWidth: 200,
    fontSize: "14px",
  },
});

const ProductForm = ({ dataHandler, initialData, websites, addCategory }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [referenceWebsite, setReferenceWebsite] = useState("");
  const [category, setCategory] = useState("");

  const [brand, setBrand] = useState("");
  const [brandsList, setBrandsList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [keyFeatures, setKeyFeatures] = useState([""]);
  const [tags, setTags] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [specs, setSpecs] = useState([
    { group: "", key: "", value: "", unit: "" },
  ]);
  const [variants, setVariants] = useState([
    {
      sku: "",
      options: { color: "", storage: "" },
      pricing: { mrp: 0, price: 0, currency: "INR" },
      stock: 0,
      status: "IN_STOCK",
      isDefault: true,
      variantImages: [],
      previewImages: [],
      weight: { value: 0, unit: "g" },
      dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
      barcode: { upc: "", ean: "", gtin: "" },
    },
  ]);
  const [visibility, setVisibility] = useState("PUBLIC");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [status, setStatus] = useState("ACTIVE");
  const { user, categories, brands } = useUser();
  console.log(categories, "caac");
  // New state for additional fields
  const [codAvailable, setCodAvailable] = useState(true);
  const [minOrderQty, setMinOrderQty] = useState(1);
  const [maxOrderQty, setMaxOrderQty] = useState(10);
  const [returnPolicy, setReturnPolicy] = useState({
    eligible: true,
    days: 7,
  });
  const [warranty, setWarranty] = useState({
    type: "Manufacturer",
    durationMonths: 0,
  });
  const [tax, setTax] = useState({
    hsn: "",
    gstRate: 0,
  });
  const [dealOfTheDay, setDealOfTheDay] = useState({
    status: false,
    startTime: null,
    endTime: null,
    discountPercent: 0,
    variantIds: [],
  });
  const [attributesFlat, setAttributesFlat] = useState({});

  useEffect(() => {
    if (initialData) {
      setProductName(initialData?.productName || "");
      setSlug(initialData?.slug || "");
      setDescription(initialData?.description || "");
      setReferenceWebsite(initialData?.referenceWebsite || "");
      setCategory(initialData?.category?._id || "");
      setBrand(initialData?.brand?._id || "");
      setKeyFeatures(initialData?.keyFeatures || [""]);
      setTags(initialData?.tags || []);
      setSpecs(
        initialData?.specs || [{ group: "", key: "", value: "", unit: "" }]
      );
      setVariants(
        initialData.variants?.map((variant) => ({
          ...variant,
          options: variant.options || { color: "", storage: "" },
          variantImages: [],
          previewImages: variant.images || [],
          weight: variant.weight || { value: 0, unit: "g" },
          dimensions: variant.dimensions || { l: 0, w: 0, h: 0, unit: "cm" },
          barcode: variant.barcode || { upc: "", ean: "", gtin: "" },
        })) || [
          {
            sku: "",
            options: { color: "", storage: "" },
            pricing: { mrp: 0, price: 0, currency: "INR" },
            stock: 0,
            status: "IN_STOCK",
            isDefault: true,
            variantImages: [],
            previewImages: [],
            weight: { value: 0, unit: "g" },
            dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
            barcode: { upc: "", ean: "", gtin: "" },
          },
        ]
      );
      setVisibility(initialData?.visibility || "PUBLIC");
      setMetaKeywords(initialData?.seo?.metaKeywords || []);
      setMetaTitle(initialData?.seo?.metaTitle || ""); // Add this line
      setMetaDescription(initialData?.seo?.metaDescription || "");
      setPreviewImages(initialData?.images || []);
      setStatus(initialData?.status || "ACTIVE");
      setCodAvailable(initialData?.codAvailable ?? true);
      setMinOrderQty(initialData?.minOrderQty || 1);
      setMaxOrderQty(initialData?.maxOrderQty || 10);
      setReturnPolicy(initialData?.returnPolicy || { eligible: true, days: 7 });
      setWarranty(
        initialData?.warranty || { type: "Manufacturer", durationMonths: 0 }
      );
      setTax(initialData?.tax || { hsn: "", gstRate: 0 });
      setDealOfTheDay(
        initialData?.dealOfTheDay || {
          status: false,
          startTime: null,
          endTime: null,
          discountPercent: 0,
          variantIds: [],
        }
      );
      setAttributesFlat(initialData?.attributesFlat || {});
    } else {
      resetForm();
    }
  }, [initialData]);

  useEffect(() => {
    if (user && !initialData) {
      setReferenceWebsite(user.referenceWebsite || "");
    }
  }, [user, initialData]);

  const resetForm = () => {
    setProductName("");
    setSlug("");
    setDescription("");
    setReferenceWebsite("");
    setCategory("");
    setBrand("");
    setImageFiles([]);
    setPreviewImages([]);
    setKeyFeatures([""]);
    setTags([]);
    setSpecs([{ group: "", key: "", value: "", unit: "" }]);
    setVariants([
      {
        sku: "",
        options: { color: "", storage: "" },
        pricing: { mrp: 0, price: 0, currency: "INR" },
        stock: 0,
        status: "IN_STOCK",
        isDefault: true,
        variantImages: [],
        previewImages: [],
        weight: { value: 0, unit: "g" },
        dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
        barcode: { upc: "", ean: "", gtin: "" },
      },
    ]);
    setVisibility("PUBLIC");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords([]);
    setStatus("ACTIVE");
    setCodAvailable(true);
    setMinOrderQty(1);
    setMaxOrderQty(10);
    setReturnPolicy({ eligible: true, days: 7 });
    setWarranty({ type: "Manufacturer", durationMonths: 0 });
    setTax({ hsn: "", gstRate: 0 });
    setDealOfTheDay({
      status: false,
      startTime: null,
      endTime: null,
      discountPercent: 0,
      variantIds: [],
    });
    setAttributesFlat({});
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const handleVariantImageUpload = (e, index) => {
    const files = Array.from(e.target.files);
    const newVariants = [...variants];

    if (!newVariants[index].variantImages) {
      newVariants[index].variantImages = [];
    }

    if (!newVariants[index].previewImages) {
      newVariants[index].previewImages = [];
    }

    newVariants[index].variantImages = [
      ...newVariants[index].variantImages,
      ...files,
    ];
    newVariants[index].previewImages = [
      ...newVariants[index].previewImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ];

    setVariants(newVariants);
  };

  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);

    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const removeVariantImage = (variantIndex, imgIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].previewImages.splice(imgIndex, 1);
    newVariants[variantIndex].variantImages.splice(imgIndex, 1);
    setVariants(newVariants);
  };

  const handleKeyFeatureChange = (index, value) => {
    const newFeatures = [...keyFeatures];
    newFeatures[index] = value;
    setKeyFeatures(newFeatures);
  };

  const addKeyFeature = () => {
    setKeyFeatures([...keyFeatures, ""]);
  };

  const removeKeyFeature = (index) => {
    const newFeatures = [...keyFeatures];
    newFeatures.splice(index, 1);
    setKeyFeatures(newFeatures);
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, { group: "", key: "", value: "", unit: "" }]);
  };

  const removeSpec = (index) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  // Drop-in replacement
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    const v = newVariants[index] || (newVariants[index] = {});

    // ✅ numeric fields ko sanitize (empty = "", warna 0+ number)
    const isNumeric = (f) =>
      [
        "pricing.mrp",
        "pricing.price",
        "pricing.discount",
        "pricing.tax",
        "weight.value",
        "dimensions.length",
        "dimensions.width",
        "dimensions.height",
        "inventory.totalStock",
        "inventory.lowStockThreshold",
        "stock", // legacy
      ].includes(f);

    const norm = (f, raw) => {
      if (!isNumeric(f)) return raw;
      if (raw === "" || raw === null || raw === undefined) return "";
      const n = Number(raw);
      return Number.isNaN(n) ? 0 : Math.max(0, n);
    };

    if (field.includes("options.")) {
      const optionField = field.split(".")[1];
      v.options = v.options || {};
      v.options[optionField] = value;
    } else if (field.includes("pricing.")) {
      const pricingField = field.split(".")[1];
      v.pricing = v.pricing || {};
      v.pricing[pricingField] = norm(`pricing.${pricingField}`, value);
    } else if (field.includes("weight.")) {
      const weightField = field.split(".")[1];
      v.weight = v.weight || {};
      v.weight[weightField] = norm(`weight.${weightField}`, value);
    } else if (field.includes("dimensions.")) {
      const dimField = field.split(".")[1];
      v.dimensions = v.dimensions || {};
      v.dimensions[dimField] = norm(`dimensions.${dimField}`, value);
    } else if (field.includes("barcode.")) {
      const barcodeField = field.split(".")[1];
      v.barcode = v.barcode || {};
      v.barcode[barcodeField] = value;
    } else if (field.includes("inventory.")) {
      // ✅ naya schema support
      const invField = field.split(".")[1];
      v.inventory = v.inventory || {};
      v.inventory[invField] = norm(`inventory.${invField}`, value);
    } else if (field === "stock") {
      // ✅ legacy UI support: "stock" -> inventory.totalStock
      v.inventory = v.inventory || {};
      v.inventory.totalStock = norm("inventory.totalStock", value);
      // optional: mirror rakho agar kahin aur 'stock' read ho raha ho
      v.stock = v.inventory.totalStock;
    } else {
      v[field] = value;
    }

    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        sku: "",
        options: { color: "", storage: "" },
        pricing: { mrp: 0, price: 0, currency: "INR" },
        stock: 0,
        status: "IN_STOCK",
        isDefault: false,
        variantImages: [],
        previewImages: [],
        weight: { value: 0, unit: "g" },
        dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
        barcode: { upc: "", ean: "", gtin: "" },
      },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const addKeyword = () => {
    if (currentKeyword && !metaKeywords.includes(currentKeyword)) {
      setMetaKeywords([...metaKeywords, currentKeyword]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index) => {
    const newKeywords = [...metaKeywords];
    newKeywords.splice(index, 1);
    setMetaKeywords(newKeywords);
  };

  const handleSubmit = async () => {
    if (
      (!addCategory &&
        (!productName ||
          !description ||
          (!initialData && imageFiles.length === 0) ||
          !referenceWebsite ||
          !category)) ||
      (addCategory && !productName)
    ) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();

    // Append all non-file fields first
    formData.append("productName", productName);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("referenceWebsite", referenceWebsite);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("visibility", visibility);
    formData.append("status", status);
    formData.append("codAvailable", codAvailable);
    formData.append("minOrderQty", minOrderQty);
    formData.append("maxOrderQty", maxOrderQty);
    formData.append("returnPolicy", JSON.stringify(returnPolicy));
    formData.append("warranty", JSON.stringify(warranty));
    formData.append("tax", JSON.stringify(tax));
    formData.append("dealOfTheDay", JSON.stringify(dealOfTheDay));
    formData.append("attributesFlat", JSON.stringify(attributesFlat));

    // Append product images
    imageFiles.forEach((file) => {
      formData.append("images", file); // Make sure this matches your multer field name
    });

    // Append key features
    keyFeatures.forEach((feature, index) => {
      formData.append(`keyFeatures[${index}]`, feature);
    });

    // Append tags
    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    // Append specs
    specs.forEach((spec, index) => {
      formData.append(`specs[${index}][group]`, spec.group);
      formData.append(`specs[${index}][key]`, spec.key);
      formData.append(`specs[${index}][value]`, spec.value);
      formData.append(`specs[${index}][unit]`, spec.unit);
    });

    // Append variants
    variants.forEach((variant, index) => {
      variant = {
        ...variant,
        inventory: variant.inventory || {
          totalStock: variant.stock ?? 0,
          lowStockThreshold: 5,
        },
      };

      // Append variant options
      Object.entries(variant.options).forEach(([key, value]) => {
        formData.append(`variants[${index}][options][${key}]`, value);
      });

      // Append pricing
      formData.append(`variants[${index}][pricing][mrp]`, variant.pricing.mrp);
      formData.append(
        `variants[${index}][pricing][price]`,
        variant.pricing.price
      );
      formData.append(
        `variants[${index}][pricing][currency]`,
        variant.pricing.currency
      );

      // Append other variant fields
      formData.append(
        `variants[${index}][inventory][totalStock]`,
        String(variant.inventory.totalStock ?? 0)
      );
      formData.append(
        `variants[${index}][inventory][lowStockThreshold]`,
        String(variant.inventory.lowStockThreshold ?? 5)
      );

      const safeSku = (
        variant.sku ||
        `${slug || productName || "prod"}-${index + 1}-${Date.now().toString(
          36
        )}`
      )
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      formData.append(`variants[${index}][sku]`, safeSku);

      formData.append(`variants[${index}][status]`, variant.status);
      formData.append(`variants[${index}][isDefault]`, variant.isDefault);

      // Append weight
      formData.append(
        `variants[${index}][weight][value]`,
        variant.weight.value
      );
      formData.append(`variants[${index}][weight][unit]`, variant.weight.unit);

      // Append dimensions
      formData.append(
        `variants[${index}][dimensions][l]`,
        variant.dimensions.l
      );
      formData.append(
        `variants[${index}][dimensions][w]`,
        variant.dimensions.w
      );
      formData.append(
        `variants[${index}][dimensions][h]`,
        variant.dimensions.h
      );
      formData.append(
        `variants[${index}][dimensions][unit]`,
        variant.dimensions.unit
      );

      // Append barcode
      formData.append(
        `variants[${index}][barcode][upc]`,
        variant.barcode.upc || ""
      );
      formData.append(
        `variants[${index}][barcode][ean]`,
        variant.barcode.ean || ""
      );
      formData.append(
        `variants[${index}][barcode][gtin]`,
        variant.barcode.gtin || ""
      );

      // Append variant images - THIS IS THE CRUCIAL PART
      variant.variantImages.forEach((file, imgIndex) => {
        formData.append(`variantImages_${index}`, file); // Changed from variants[${index}][variantImages][${imgIndex}]
      });
    });

    // Append SEO fields
    formData.append("seo[metaTitle]", metaTitle);
    formData.append("seo[metaDescription]", metaDescription);
    metaKeywords.forEach((keyword, index) => {
      formData.append(`seo[metaKeywords][${index}]`, keyword);
    });

    try {
      const response = initialData
        ? await apiPut(`api/product/products/${initialData._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await apiPost("api/product/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if (response.status === 200) {
        setSnackbarMessage(
          initialData
            ? "Product updated successfully"
            : "Product added successfully"
        );
        setSnackbarSeverity("success");
        setOpen(false);
        dataHandler();
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSnackbarMessage("Failed to save product");
      setSnackbarSeverity("error");
    }

    setSnackbarOpen(true);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await apiGet("/api/brand/getbrand");
        if (response.data.success) {
          setBrandsList(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Failed to load brands");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
    fetchBrand();
  }, []);

  return (
    <div>
      {initialData ? (
        <IconButton onClick={handleClickOpen}>
          <EditNoteOutlined />
        </IconButton>
      ) : user && (user.role === "admin" || user.role === "vendor") ? (
        <Button sx={{ px: 2, py: 1 }} color="primary" onClick={handleClickOpen}>
          <AddIcon /> {addCategory ? "Add Category" : "New Product"}
        </Button>
      ) : null}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle sx={{ color: "#872d67" }}>
          {initialData ? "Update Product" : "New Product"}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name*"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slug"
                variant="outlined"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(value) => setDescription(value)}
                placeholder="Enter product description..."
                style={{
                  background: "#fff",
                  borderRadius: 4,
                  width: "100%",
                  height: "200px",
                  marginBottom: "40px",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category*</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Brand</InputLabel>
                <Select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  label="Brand"
                >
                  {brandsList.length === 0 ? (
                    <MenuItem disabled>Loading brands...</MenuItem>
                  ) : (
                    brandsList.map((brandItem) => (
                      <MenuItem key={brandItem._id} value={brandItem._id}>
                        <Box display="flex" alignItems="center">
                          {brandItem.logo && (
                            <img
                              src={brandItem.logo}
                              alt={brandItem.name}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                                objectFit: "contain",
                              }}
                            />
                          )}
                          {brandItem.name}
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Key Features Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Key Features
              </Typography>
              {keyFeatures.map((feature, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={feature}
                    onChange={(e) =>
                      handleKeyFeatureChange(index, e.target.value)
                    }
                    margin="normal"
                  />
                  <IconButton onClick={() => removeKeyFeature(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={addKeyFeature} startIcon={<AddIcon />}>
                Add Feature
              </Button>
            </Grid>

            {/* Specifications Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              {specs.map((spec, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection="column"
                  mb={2}
                  p={1}
                  border={1}
                  borderRadius={1}
                >
                  <Box display="flex" gap={2} mb={1}>
                    <TextField
                      label="Group"
                      value={spec.group}
                      onChange={(e) =>
                        handleSpecChange(index, "group", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Key"
                      value={spec.key}
                      onChange={(e) =>
                        handleSpecChange(index, "key", e.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                  <Box display="flex" gap={2} mb={1}>
                    <TextField
                      label="Value"
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Unit"
                      value={spec.unit}
                      onChange={(e) =>
                        handleSpecChange(index, "unit", e.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                  <Button
                    onClick={() => removeSpec(index)}
                    startIcon={<DeleteIcon />}
                  >
                    Remove Spec
                  </Button>
                </Box>
              ))}
              <Button onClick={addSpec} startIcon={<AddIcon />}>
                Add Specification
              </Button>
            </Grid>

            {/* Product Images Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Product Images
              </Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ marginBottom: 16 }}
              />
              <Grid container spacing={1}>
                {previewImages.map((img, idx) => (
                  <Grid item key={idx} position="relative">
                    <img
                      src={img}
                      alt={`preview-${idx}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      onClick={() => removeImage(idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Variants Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Variants
              </Typography>
              {variants.map((variant, index) => (
                <Box key={index} border={1} p={2} mb={2} borderRadius={1}>
                  <Typography variant="subtitle2" gutterBottom>
                    Variant {index + 1}
                    {variant.isDefault && (
                      <Chip label="Default" size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="SKU*"
                        value={variant.sku}
                        onChange={(e) =>
                          handleVariantChange(index, "sku", e.target.value)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={variant.status}
                          onChange={(e) =>
                            handleVariantChange(index, "status", e.target.value)
                          }
                        >
                          <MenuItem value="IN_STOCK">In Stock</MenuItem>
                          <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
                          <MenuItem value="PREORDER">Preorder</MenuItem>
                          <MenuItem value="DISCONTINUED">Discontinued</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Color"
                        value={variant.options.color}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "options.color",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Storage"
                        value={variant?.options?.storage || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "options.storage",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="MRP*"
                        type="number"
                        value={variant.pricing.mrp}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "pricing.mrp",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Selling Price*"
                        type="number"
                        value={variant.pricing.price}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "pricing.price",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Total Stock*"
                        type="number"
                        value={variant.inventory?.totalStock || 0}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "inventory.totalStock",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Low Stock Threshold"
                        type="number"
                        value={variant.inventory?.lowStockThreshold || 5}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "inventory.lowStockThreshold",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={variant.isDefault}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "isDefault",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="Default Variant"
                      />
                    </Grid>

                    {/* Weight Fields */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Weight Value"
                        type="number"
                        value={variant.weight.value}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "weight.value",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Weight Unit</InputLabel>
                        <Select
                          value={variant.weight.unit}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "weight.unit",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="g">Grams (g)</MenuItem>
                          <MenuItem value="kg">Kilograms (kg)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Dimensions Fields */}
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Length"
                        type="number"
                        value={variant.dimensions.l}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "dimensions.l",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Width"
                        type="number"
                        value={variant.dimensions.w}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "dimensions.w",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Height"
                        type="number"
                        value={variant.dimensions.h}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "dimensions.h",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Dimension Unit</InputLabel>
                        <Select
                          value={variant.dimensions.unit}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "dimensions.unit",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="cm">Centimeters (cm)</MenuItem>
                          <MenuItem value="in">Inches (in)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Barcode Fields */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="UPC"
                        value={variant.barcode.upc || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "barcode.upc",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="EAN"
                        value={variant.barcode.ean || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "barcode.ean",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="GTIN"
                        value={variant.barcode.gtin || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "barcode.gtin",
                            e.target.value
                          )
                        }
                        margin="normal"
                      />
                    </Grid>

                    {/* Variant Images */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Variant Images
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleVariantImageUpload(e, index)}
                        style={{ marginBottom: 16 }}
                      />
                      <Grid container spacing={1}>
                        {variant?.previewImages?.map((img, idx) => (
                          <Grid item key={idx} position="relative">
                            <img
                              src={img}
                              alt={`variant-preview-${idx}`}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
                            />
                            <IconButton
                              size="small"
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                backgroundColor: "rgba(255,255,255,0.7)",
                              }}
                              onClick={() => removeVariantImage(index, idx)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  {variants.length > 1 && (
                    <Button
                      onClick={() => removeVariant(index)}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Remove Variant
                    </Button>
                  )}
                </Box>
              ))}
              <Button onClick={addVariant} startIcon={<AddIcon />}>
                Add Variant
              </Button>
            </Grid>

            {/* Commerce Settings Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Commerce Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={codAvailable}
                        onChange={(e) => setCodAvailable(e.target.checked)}
                      />
                    }
                    label="COD Available"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Minimum Order Quantity"
                    type="number"
                    value={minOrderQty}
                    onChange={(e) =>
                      setMinOrderQty(parseInt(e.target.value) || 1)
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Maximum Order Quantity"
                    type="number"
                    value={maxOrderQty}
                    onChange={(e) =>
                      setMaxOrderQty(parseInt(e.target.value) || 10)
                    }
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Return Policy Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Return Policy
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={returnPolicy.eligible}
                        onChange={(e) =>
                          setReturnPolicy({
                            ...returnPolicy,
                            eligible: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Eligible for Returns"
                  />
                </Grid>
                {returnPolicy.eligible && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Return Window (Days)"
                      type="number"
                      value={returnPolicy.days}
                      onChange={(e) =>
                        setReturnPolicy({
                          ...returnPolicy,
                          days: parseInt(e.target.value) || 7,
                        })
                      }
                      margin="normal"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Warranty Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Warranty
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Warranty Type</InputLabel>
                    <Select
                      value={warranty.type}
                      onChange={(e) =>
                        setWarranty({ ...warranty, type: e.target.value })
                      }
                    >
                      <MenuItem value="No Warranty">No Warranty</MenuItem>
                      <MenuItem value="Seller">Seller</MenuItem>
                      <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                      <MenuItem value="International">International</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Warranty Duration (Months)"
                    type="number"
                    value={warranty.durationMonths}
                    onChange={(e) =>
                      setWarranty({
                        ...warranty,
                        durationMonths: parseInt(e.target.value) || 0,
                      })
                    }
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Tax Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Tax Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="HSN Code"
                    value={tax.hsn}
                    onChange={(e) => setTax({ ...tax, hsn: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GST Rate (%)"
                    type="number"
                    value={tax.gstRate}
                    onChange={(e) =>
                      setTax({ ...tax, gstRate: parseInt(e.target.value) || 0 })
                    }
                    margin="normal"
                    inputProps={{ min: 0, max: 28 }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Deal of the Day Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Deal of the Day
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dealOfTheDay.status}
                        onChange={(e) =>
                          setDealOfTheDay({
                            ...dealOfTheDay,
                            status: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Enable Deal of the Day"
                  />
                </Grid>
                {dealOfTheDay.status && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Discount Percentage"
                        type="number"
                        value={dealOfTheDay.discountPercent}
                        onChange={(e) =>
                          setDealOfTheDay({
                            ...dealOfTheDay,
                            discountPercent: parseInt(e.target.value) || 0,
                          })
                        }
                        margin="normal"
                        inputProps={{ min: 0, max: 95 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" gutterBottom>
                        Start Time
                      </Typography>
                      <DatePicker
                        selected={dealOfTheDay.startTime}
                        onChange={(date) =>
                          setDealOfTheDay({ ...dealOfTheDay, startTime: date })
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" gutterBottom>
                        End Time
                      </Typography>
                      <DatePicker
                        selected={dealOfTheDay.endTime}
                        onChange={(date) =>
                          setDealOfTheDay({ ...dealOfTheDay, endTime: date })
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Variant SKUs (comma separated)"
                        value={dealOfTheDay.variantIds.join(",")}
                        onChange={(e) =>
                          setDealOfTheDay({
                            ...dealOfTheDay,
                            variantIds: e.target.value
                              .split(",")
                              .map((s) => s.trim()),
                          })
                        }
                        margin="normal"
                        helperText="Leave empty to apply to all variants"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {/* SEO Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                SEO Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tags
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      label="Add Tag"
                      margin="normal"
                    />
                    <Button onClick={addTag} sx={{ ml: 1, mt: 2 }}>
                      Add
                    </Button>
                  </Box>
                  <Box>
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => removeTag(index)}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    SEO Keywords
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      label="Add Keyword"
                      margin="normal"
                    />
                    <Button onClick={addKeyword} sx={{ ml: 1, mt: 2 }}>
                      Add
                    </Button>
                  </Box>
                  <Box>
                    {metaKeywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        onDelete={() => removeKeyword(index)}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Admin Settings Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Admin Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Visibility</InputLabel>
                    <Select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <MenuItem value="PUBLIC">Public</MenuItem>
                      <MenuItem value="PRIVATE">Private</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="DRAFT">Draft</MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                      <MenuItem value="ARCHIVED">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default ProductForm;
