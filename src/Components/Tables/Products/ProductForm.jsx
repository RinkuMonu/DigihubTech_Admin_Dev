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
import "./productFrom.css";
const useStyles = makeStyles({
  selectInput: {
    minWidth: 200,
    fontSize: "14px",
  },
});

// const ProductForm = ({ dataHandler, initialData, websites, addCategory }) => {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [referenceWebsite, setReferenceWebsite] = useState("");
//   const [category, setCategory] = useState("");

//   const [brand, setBrand] = useState("");
//   const [brandsList, setBrandsList] = useState([]);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [keyFeatures, setKeyFeatures] = useState([""]);
//   const [tags, setTags] = useState([]);
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [metaKeywords, setMetaKeywords] = useState([]);
//   const [currentTag, setCurrentTag] = useState("");
//   const [specs, setSpecs] = useState([
//     { group: "", key: "", value: "", unit: "" },
//   ]);

//   const [fields, setFields] = useState([
//     { label: "", value: "", type: "Text" }
//   ]);
//   // console.log(fields);

//   const addField = () => {
//     setFields([...fields, { label: "", value: "", type: "Text" }]);
//   };

//   const removeField = (index) => {
//     setFields(fields.filter((_, i) => i !== index));
//   };

//   const handleFieldChange = (index, key, value) => {
//     const updated = [...fields];
//     updated[index][key] = value;
//     setFields(updated);
//   };

//   const [variants, setVariants] = useState([
//     {
//       sku: "",
//       options: {},
//       pricing: { mrp: 0, price: 0, currency: "INR" },
//       stock: 0,
//       status: "IN_STOCK",
//       isDefault: true,
//       variantImages: [],
//       previewImages: [],
//       weight: { value: 0, unit: "g" },
//       dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
//       barcode: { upc: "", ean: "", gtin: "" },
//     },
//   ]);
//   const [visibility, setVisibility] = useState("PUBLIC");
//   const [currentKeyword, setCurrentKeyword] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [status, setStatus] = useState("ACTIVE");
//   const { user, categories, brands } = useUser();
//   // console.log(categories, "caac");
//   // New state for additional fields
//   const [codAvailable, setCodAvailable] = useState(true);
//   const [minOrderQty, setMinOrderQty] = useState(1);
//   const [maxOrderQty, setMaxOrderQty] = useState(10);
//   const [returnPolicy, setReturnPolicy] = useState({
//     eligible: true,
//     days: 7,
//   });
//   const [warranty, setWarranty] = useState({
//     type: "Manufacturer",
//     durationMonths: 0,
//   });
//   const [tax, setTax] = useState({
//     hsn: "",
//     gstRate: 0,
//   });
//   const [dealOfTheDay, setDealOfTheDay] = useState({
//     status: false,
//     startTime: null,
//     endTime: null,
//     discountPercent: 0,
//     variantIds: [],
//   });
//   const [attributesFlat, setAttributesFlat] = useState({});

//   useEffect(() => {
//     if (initialData) {
//       setProductName(initialData?.productName || "");
//       setSlug(initialData?.slug || "");
//       setDescription(initialData?.description || "");
//       setReferenceWebsite(initialData?.referenceWebsite || "");
//       setCategory(initialData?.category?._id || "");
//       setBrand(initialData?.brand?._id || "");
//       setKeyFeatures(initialData?.keyFeatures || [""]);
//       setTags(initialData?.tags || []);
//       setSpecs(
//         initialData?.specs || [{ group: "", key: "", value: "", unit: "" }]
//       );
//       setVariants(
//         initialData.variants?.map((variant) => ({
//           ...variant,
//           options: fields.map((field) => ({
//             label: field.label,
//             type: field.type,
//             value: field.value,
//           })),
//           variantImages: [],
//           previewImages: variant.images || [],
//           weight: variant.weight || { value: 0, unit: "g" },
//           dimensions: variant.dimensions || { l: 0, w: 0, h: 0, unit: "cm" },
//           barcode: variant.barcode || { upc: "", ean: "", gtin: "" },
//         })) || [
//           {
//             sku: "",
//             options: {},
//             pricing: { mrp: 0, price: 0, currency: "INR" },
//             stock: 0,
//             status: "IN_STOCK",
//             isDefault: true,
//             variantImages: [],
//             previewImages: [],
//             weight: { value: 0, unit: "g" },
//             dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
//             barcode: { upc: "", ean: "", gtin: "" },
//           },
//         ]
//       );
//       setVisibility(initialData?.visibility || "PUBLIC");
//       setMetaKeywords(initialData?.seo?.metaKeywords || []);
//       setMetaTitle(initialData?.seo?.metaTitle || ""); // Add this line
//       setMetaDescription(initialData?.seo?.metaDescription || "");
//       setPreviewImages(initialData?.images || []);
//       setStatus(initialData?.status || "ACTIVE");
//       setCodAvailable(initialData?.codAvailable ?? true);
//       setMinOrderQty(initialData?.minOrderQty || 1);
//       setMaxOrderQty(initialData?.maxOrderQty || 10);
//       setReturnPolicy(initialData?.returnPolicy || { eligible: true, days: 7 });
//       setWarranty(
//         initialData?.warranty || { type: "Manufacturer", durationMonths: 0 }
//       );
//       setTax(initialData?.tax || { hsn: "", gstRate: 0 });
//       setDealOfTheDay(
//         initialData?.dealOfTheDay || {
//           status: false,
//           startTime: null,
//           endTime: null,
//           discountPercent: 0,
//           variantIds: [],
//         }
//       );
//       setAttributesFlat(initialData?.attributesFlat || {});
//     } else {
//       resetForm();
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (user && !initialData) {
//       setReferenceWebsite(user?.referenceWebsite || "");
//     }
//   }, [user, initialData]);

//   const resetForm = () => {
//     setProductName("");
//     setSlug("");
//     setDescription("");
//     setReferenceWebsite("");
//     setCategory("");
//     setBrand("");
//     setImageFiles([]);
//     setPreviewImages([]);
//     setKeyFeatures([""]);
//     setTags([]);
//     setSpecs([{ group: "", key: "", value: "", unit: "" }]);
//     setVariants([
//       {
//         sku: "",
//         options: {},
//         pricing: { mrp: 0, price: 0, currency: "INR" },
//         stock: 0,
//         status: "IN_STOCK",
//         isDefault: true,
//         variantImages: [],
//         previewImages: [],
//         weight: { value: 0, unit: "g" },
//         dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
//         barcode: { upc: "", ean: "", gtin: "" },
//       },
//     ]);
//     setVisibility("PUBLIC");
//     setMetaTitle("");
//     setMetaDescription("");
//     setMetaKeywords([]);
//     setStatus("ACTIVE");
//     setCodAvailable(true);
//     setMinOrderQty(1);
//     setMaxOrderQty(10);
//     setReturnPolicy({ eligible: true, days: 7 });
//     setWarranty({ type: "Manufacturer", durationMonths: 0 });
//     setTax({ hsn: "", gstRate: 0 });
//     setDealOfTheDay({
//       status: false,
//       startTime: null,
//       endTime: null,
//       discountPercent: 0,
//       variantIds: [],
//     });
//     setAttributesFlat({});
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages([...previewImages, ...previews]);
//   };

//   const handleVariantImageUpload = (e, index) => {
//     const files = Array.from(e.target.files);
//     const newVariants = [...variants];

//     if (!newVariants[index].variantImages) {
//       newVariants[index].variantImages = [];
//     }

//     if (!newVariants[index].previewImages) {
//       newVariants[index].previewImages = [];
//     }

//     newVariants[index].variantImages = [
//       ...newVariants[index].variantImages,
//       ...files,
//     ];
//     newVariants[index].previewImages = [
//       ...newVariants[index].previewImages,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ];

//     setVariants(newVariants);
//   };

//   const removeImage = (index) => {
//     const newPreviews = [...previewImages];
//     newPreviews.splice(index, 1);
//     setPreviewImages(newPreviews);

//     const newFiles = [...imageFiles];
//     newFiles.splice(index, 1);
//     setImageFiles(newFiles);
//   };

//   const removeVariantImage = (variantIndex, imgIndex) => {
//     const newVariants = [...variants];
//     newVariants[variantIndex].previewImages.splice(imgIndex, 1);
//     newVariants[variantIndex].variantImages.splice(imgIndex, 1);
//     setVariants(newVariants);
//   };

//   const handleKeyFeatureChange = (index, value) => {
//     const newFeatures = [...keyFeatures];
//     newFeatures[index] = value;
//     setKeyFeatures(newFeatures);
//   };

//   const addKeyFeature = () => {
//     setKeyFeatures([...keyFeatures, ""]);
//   };

//   const removeKeyFeature = (index) => {
//     const newFeatures = [...keyFeatures];
//     newFeatures.splice(index, 1);
//     setKeyFeatures(newFeatures);
//   };

//   const handleSpecChange = (index, field, value) => {
//     const newSpecs = [...specs];
//     newSpecs[index][field] = value;
//     setSpecs(newSpecs);
//   };

//   const addSpec = () => {
//     setSpecs([...specs, { group: "", key: "", value: "", unit: "" }]);
//   };

//   const removeSpec = (index) => {
//     const newSpecs = [...specs];
//     newSpecs.splice(index, 1);
//     setSpecs(newSpecs);
//   };

//   // Drop-in replacement
//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...variants];
//     const v = newVariants[index] || (newVariants[index] = {});

//     // ✅ numeric fields ko sanitize (empty = "", warna 0+ number)
//     const isNumeric = (f) =>
//       [
//         "pricing.mrp",
//         "pricing.price",
//         "pricing.discount",
//         "pricing.tax",
//         "weight.value",
//         "dimensions.length",
//         "dimensions.width",
//         "dimensions.height",
//         "inventory.totalStock",
//         "inventory.lowStockThreshold",
//         "stock", // legacy
//       ].includes(f);

//     const norm = (f, raw) => {
//       if (!isNumeric(f)) return raw;
//       if (raw === "" || raw === null || raw === undefined) return "";
//       const n = Number(raw);
//       return Number.isNaN(n) ? 0 : Math.max(0, n);
//     };

//     if (field.includes("options.")) {
//       const optionField = field.split(".")[1];
//       v.options = v.options || {};
//       v.options[optionField] = value;
//     } else if (field.includes("pricing.")) {
//       const pricingField = field.split(".")[1];
//       v.pricing = v.pricing || {};
//       v.pricing[pricingField] = norm(`pricing.${pricingField}`, value);
//     } else if (field.includes("weight.")) {
//       const weightField = field.split(".")[1];
//       v.weight = v.weight || {};
//       v.weight[weightField] = norm(`weight.${weightField}`, value);
//     } else if (field.includes("dimensions.")) {
//       const dimField = field.split(".")[1];
//       v.dimensions = v.dimensions || {};
//       v.dimensions[dimField] = norm(`dimensions.${dimField}`, value);
//     } else if (field.includes("barcode.")) {
//       const barcodeField = field.split(".")[1];
//       v.barcode = v.barcode || {};
//       v.barcode[barcodeField] = value;
//     } else if (field.includes("inventory.")) {
//       // ✅ naya schema support
//       const invField = field.split(".")[1];
//       v.inventory = v.inventory || {};
//       v.inventory[invField] = norm(`inventory.${invField}`, value);
//     } else if (field === "stock") {
//       // ✅ legacy UI support: "stock" -> inventory.totalStock
//       v.inventory = v.inventory || {};
//       v.inventory.totalStock = norm("inventory.totalStock", value);
//       // optional: mirror rakho agar kahin aur 'stock' read ho raha ho
//       v.stock = v.inventory.totalStock;
//     } else {
//       v[field] = value;
//     }

//     setVariants(newVariants);
//   };

//   const addVariant = () => {
//     setVariants([
//       ...variants,
//       {
//         sku: "",
//         options: {},
//         pricing: { mrp: 0, price: 0, currency: "INR" },
//         stock: 0,
//         status: "IN_STOCK",
//         isDefault: false,
//         variantImages: [],
//         previewImages: [],
//         weight: { value: 0, unit: "g" },
//         dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
//         barcode: { upc: "", ean: "", gtin: "" },
//       },
//     ]);
//   };

//   const removeVariant = (index) => {
//     const newVariants = [...variants];
//     newVariants.splice(index, 1);
//     setVariants(newVariants);
//   };

//   const addTag = () => {
//     if (currentTag && !tags.includes(currentTag)) {
//       setTags([...tags, currentTag]);
//       setCurrentTag("");
//     }
//   };

//   const removeTag = (index) => {
//     const newTags = [...tags];
//     newTags.splice(index, 1);
//     setTags(newTags);
//   };

//   const addKeyword = () => {
//     if (currentKeyword && !metaKeywords.includes(currentKeyword)) {
//       setMetaKeywords([...metaKeywords, currentKeyword]);
//       setCurrentKeyword("");
//     }
//   };

//   const removeKeyword = (index) => {
//     const newKeywords = [...metaKeywords];
//     newKeywords.splice(index, 1);
//     setMetaKeywords(newKeywords);
//   };

//   const handleSubmit = async () => {
//     // if (
//     //   (!addCategory &&
//     //     (!productName ||
//     //       !description ||
//     //       (!initialData && imageFiles.length === 0) ||
//     //       !referenceWebsite ||
//     //       !category)) ||
//     //   (addCategory && !productName)
//     // ) {
//     //   setSnackbarMessage("Please fill all required fields");
//     //   setSnackbarSeverity("error");
//     //   setSnackbarOpen(true);
//     //   return;
//     // }

//     const formData = new FormData();

//     // Append all non-file fields first
//     formData.append("productName", productName);
//     formData.append("slug", slug);
//     formData.append("description", description);
//     formData.append("referenceWebsite", referenceWebsite);
//     formData.append("category", category);
//     formData.append("brand", brand);
//     formData.append("visibility", visibility);
//     formData.append("status", status);
//     formData.append("codAvailable", codAvailable);
//     formData.append("minOrderQty", minOrderQty);
//     formData.append("maxOrderQty", maxOrderQty);
//     formData.append("returnPolicy", JSON.stringify(returnPolicy));
//     formData.append("warranty", JSON.stringify(warranty));
//     formData.append("tax", JSON.stringify(tax));
//     formData.append("dealOfTheDay", JSON.stringify(dealOfTheDay));
//     formData.append("attributesFlat", JSON.stringify(attributesFlat));

//     // Append product images
//     imageFiles.forEach((file) => {
//       formData.append("images", file); // Make sure this matches your multer field name
//     });

//     // Append key features
//     keyFeatures.forEach((feature, index) => {
//       formData.append(`keyFeatures[${index}]`, feature);
//     });

//     // Append tags
//     tags.forEach((tag) => {
//       formData.append("tags[]", tag);
//     });

//     // Append specs
//     specs.forEach((spec, index) => {
//       formData.append(`specs[${index}][group]`, spec.group);
//       formData.append(`specs[${index}][key]`, spec.key);
//       formData.append(`specs[${index}][value]`, spec.value);
//       formData.append(`specs[${index}][unit]`, spec.unit);
//     });
//     // console.log(variants);

//     // Append variants
//     variants.forEach((variant, index) => {
//       variant = {
//         ...variant,
//         inventory: variant.inventory || {
//           totalStock: variant.stock ?? 0,
//           lowStockThreshold: 5,
//         },
//       };

//       // Append variant options
//       // Object.entries(variant.options).forEach(([key, value]) => {
//       //   formData.append(`variants[${index}][options][${key}]`, value);
//       // });
//       // console.log(variant);

//       Object.entries(variant.options).forEach((opt, optIndex) => {
//         formData.append(`variants[${index}][options][${optIndex}][label]`, opt.label);
//         formData.append(`variants[${index}][options][${optIndex}][type]`, opt.type);
//         formData.append(`variants[${index}][options][${optIndex}][value]`, opt.value);
//       });

//       // Append pricing
//       formData.append(`variants[${index}][pricing][mrp]`, variant.pricing.mrp);
//       formData.append(
//         `variants[${index}][pricing][price]`,
//         variant.pricing.price
//       );
//       formData.append(
//         `variants[${index}][pricing][currency]`,
//         variant.pricing.currency
//       );

//       // Append other variant fields
//       formData.append(
//         `variants[${index}][inventory][totalStock]`,
//         String(variant.inventory.totalStock ?? 0)
//       );
//       formData.append(
//         `variants[${index}][inventory][lowStockThreshold]`,
//         String(variant.inventory.lowStockThreshold ?? 5)
//       );

//       const safeSku = (
//         variant.sku ||
//         `${slug || productName || "prod"}-${index + 1}-${Date.now().toString(
//           36
//         )}`
//       )
//         .toLowerCase()
//         .replace(/[^a-z0-9-]+/g, "-")
//         .replace(/-+/g, "-")
//         .slice(0, 60);
//       formData.append(`variants[${index}][sku]`, safeSku);

//       formData.append(`variants[${index}][status]`, variant.status);
//       formData.append(`variants[${index}][isDefault]`, variant.isDefault);

//       // Append weight
//       formData.append(
//         `variants[${index}][weight][value]`,
//         variant.weight.value
//       );
//       formData.append(`variants[${index}][weight][unit]`, variant.weight.unit);

//       // Append dimensions
//       formData.append(
//         `variants[${index}][dimensions][l]`,
//         variant.dimensions.l
//       );
//       formData.append(
//         `variants[${index}][dimensions][w]`,
//         variant.dimensions.w
//       );
//       formData.append(
//         `variants[${index}][dimensions][h]`,
//         variant.dimensions.h
//       );
//       formData.append(
//         `variants[${index}][dimensions][unit]`,
//         variant.dimensions.unit
//       );

//       // Append barcode
//       formData.append(
//         `variants[${index}][barcode][upc]`,
//         variant.barcode.upc || ""
//       );
//       formData.append(
//         `variants[${index}][barcode][ean]`,
//         variant.barcode.ean || ""
//       );
//       formData.append(
//         `variants[${index}][barcode][gtin]`,
//         variant.barcode.gtin || ""
//       );

//       // Append variant images - THIS IS THE CRUCIAL PART
//       variant.variantImages.forEach((file, imgIndex) => {
//         formData.append(`variantImages_${index}`, file); // Changed from variants[${index}][variantImages][${imgIndex}]
//       });
//     });

//     // Append SEO fields
//     formData.append("seo[metaTitle]", metaTitle);
//     formData.append("seo[metaDescription]", metaDescription);
//     metaKeywords.forEach((keyword, index) => {
//       formData.append(`seo[metaKeywords][${index}]`, keyword);
//     });

//     try {
//       const response = initialData
//         ? await apiPut(`api/product/products/${initialData._id}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         : await apiPost("api/product/products", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//       if (response.status === 200) {
//         setSnackbarMessage(
//           initialData
//             ? "Product updated successfully"
//             : "Product added successfully"
//         );
//         setSnackbarSeverity("success");
//         setOpen(false);
//         dataHandler();
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       setSnackbarMessage("Failed to save product");
//       setSnackbarSeverity("error");
//     }

//     setSnackbarOpen(true);
//   };

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleSnackbarClose = () => setSnackbarOpen(false);

//   useEffect(() => {
//     const fetchBrand = async () => {
//       try {
//         const response = await apiGet("/api/brand/getbrand");
//         if (response.data.success) {
//           setBrandsList(response.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//         setSnackbarMessage("Failed to load brands");
//         setSnackbarSeverity("error");
//         setSnackbarOpen(true);
//       }
//     };
//     fetchBrand();
//   }, []);

//   return (
//     <div>
//       {initialData ? (
//         <IconButton onClick={handleClickOpen}>
//           <EditNoteOutlined />
//         </IconButton>
//       ) : user && (user.role === "admin" || user.role === "vendor") ? (
//         <Button sx={{ px: 2, py: 1 }} color="primary" onClick={handleClickOpen}>
//           <AddIcon /> {addCategory ? "Add Category" : "New Product"}
//         </Button>
//       ) : null}

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="md"
//         fullWidth
//         scroll="paper"
//       >
//         <DialogTitle sx={{ color: "#872d67" }}>
//           {initialData ? "Update Product" : "New Product"}
//         </DialogTitle>

//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             {/* Basic Information Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Basic Information
//               </Typography>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Product Name*"
//                 variant="outlined"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Slug"
//                 variant="outlined"
//                 value={slug}
//                 onChange={(e) => setSlug(e.target.value)}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <ReactQuill
//                 theme="snow"
//                 value={description}
//                 onChange={(value) => setDescription(value)}
//                 placeholder="Enter product description..."
//                 style={{
//                   background: "#fff",
//                   borderRadius: 4,
//                   width: "100%",
//                   height: "200px",
//                   marginBottom: "40px",
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Category*</InputLabel>
//                 <Select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   {categories?.map((cat) => (
//                     <MenuItem key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Brand</InputLabel>
//                 <Select
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                   label="Brand"
//                 >
//                   {brandsList.length === 0 ? (
//                     <MenuItem disabled>Loading brands...</MenuItem>
//                   ) : (
//                     brandsList.map((brandItem) => (
//                       <MenuItem key={brandItem._id} value={brandItem._id}>
//                         <Box display="flex" alignItems="center">
//                           {brandItem.logo && (
//                             <img
//                               src={brandItem.logo}
//                               alt={brandItem.name}
//                               style={{
//                                 width: 24,
//                                 height: 24,
//                                 marginRight: 8,
//                                 objectFit: "contain",
//                               }}
//                             />
//                           )}
//                           {brandItem.name}
//                         </Box>
//                       </MenuItem>
//                     ))
//                   )}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Key Features Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Key Features
//               </Typography>
//               {keyFeatures.map((feature, index) => (
//                 <Box key={index} display="flex" alignItems="center" mb={1}>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     value={feature}
//                     onChange={(e) =>
//                       handleKeyFeatureChange(index, e.target.value)
//                     }
//                     margin="normal"
//                   />
//                   <IconButton onClick={() => removeKeyFeature(index)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button onClick={addKeyFeature} startIcon={<AddIcon />}>
//                 Add Feature
//               </Button>
//             </Grid>

//             {/* Specifications Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Specifications
//               </Typography>
//               {specs.map((spec, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   flexDirection="column"
//                   mb={2}
//                   p={1}
//                   border={1}
//                   borderRadius={1}
//                 >
//                   <Box display="flex" gap={2} mb={1}>
//                     <TextField
//                       label="Group"
//                       value={spec.group}
//                       onChange={(e) =>
//                         handleSpecChange(index, "group", e.target.value)
//                       }
//                       fullWidth
//                     />
//                     <TextField
//                       label="Key"
//                       value={spec.key}
//                       onChange={(e) =>
//                         handleSpecChange(index, "key", e.target.value)
//                       }
//                       fullWidth
//                     />
//                   </Box>
//                   <Box display="flex" gap={2} mb={1}>
//                     <TextField
//                       label="Value"
//                       value={spec.value}
//                       onChange={(e) =>
//                         handleSpecChange(index, "value", e.target.value)
//                       }
//                       fullWidth
//                     />
//                     <TextField
//                       label="Unit"
//                       value={spec.unit}
//                       onChange={(e) =>
//                         handleSpecChange(index, "unit", e.target.value)
//                       }
//                       fullWidth
//                     />
//                   </Box>
//                   <Button
//                     onClick={() => removeSpec(index)}
//                     startIcon={<DeleteIcon />}
//                   >
//                     Remove Spec
//                   </Button>
//                 </Box>
//               ))}
//               <Button onClick={addSpec} startIcon={<AddIcon />}>
//                 Add Specification
//               </Button>
//             </Grid>

//             {/* Product Images Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Product Images
//               </Typography>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 style={{ marginBottom: 16 }}
//               />
//               <Grid container spacing={1}>
//                 {previewImages.map((img, idx) => (
//                   <Grid item key={idx} position="relative">
//                     <img
//                       src={img}
//                       alt={`preview-${idx}`}
//                       style={{
//                         width: 100,
//                         height: 100,
//                         objectFit: "cover",
//                         borderRadius: 4,
//                       }}
//                     />
//                     <IconButton
//                       size="small"
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         right: 0,
//                         backgroundColor: "rgba(255,255,255,0.7)",
//                       }}
//                       onClick={() => removeImage(idx)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>

//             {/* Variants Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Variants
//               </Typography>
//               {variants.map((variant, index) => (
//                 <Box key={index} border={1} p={2} mb={2} borderRadius={1}>
//                   <Typography variant="subtitle2" gutterBottom>
//                     Variant {index + 1}
//                     {variant.isDefault && (
//                       <Chip label="Default" size="small" sx={{ ml: 1 }} />
//                     )}
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="SKU*"
//                         value={variant.sku}
//                         onChange={(e) =>
//                           handleVariantChange(index, "sku", e.target.value)
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <FormControl fullWidth margin="normal">
//                         <InputLabel>Status</InputLabel>
//                         <Select
//                           value={variant.status}
//                           onChange={(e) =>
//                             handleVariantChange(index, "status", e.target.value)
//                           }
//                         >
//                           <MenuItem value="IN_STOCK">In Stock</MenuItem>
//                           <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
//                           <MenuItem value="PREORDER">Preorder</MenuItem>
//                           <MenuItem value="DISCONTINUED">Discontinued</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     -
//                     {fields.map((field, index) => (
//                       <Grid container item spacing={2} alignItems="center" key={index}>
//                         {/* Label */}
//                         <Grid item xs={12} md={4}>
//                           <TextField
//                             fullWidth
//                             label="Label"
//                             value={field.label}
//                             onChange={(e) => handleVariantChange(index, `options.${field.label}`, e.target.value)}
//                             margin="normal"
//                           />
//                         </Grid>

//                         {/* Value */}
//                         <Grid item xs={12} md={4}>
//                           <TextField
//                             fullWidth
//                             label="Value"
//                             value={field.value || ""}
//                             onChange={(e) => handleVariantChange(index, `options.${field.value}`, e.target.value)}
//                             margin="normal"
//                           />
//                         </Grid>

//                         {/* Type */}
//                         {/* <Grid item xs={12} md={3}>
//                           <TextField
//                             select
//                             fullWidth
//                             label="Type"
//                             value={field.type}
//                             margin="normal"
//                             onChange={(e) => handleFieldChange(index, "type", e.target.value)}
//                           >
//                             <MenuItem value="Text">Text</MenuItem>
//                             <MenuItem value="Number">Number</MenuItem>
//                           </TextField>
//                         </Grid> */}

//                         {/* Delete */}
//                         <Grid item xs={12} md={1}>
//                           <IconButton onClick={() => removeField(index)} color="error">
//                             🗑
//                           </IconButton>
//                         </Grid>
//                       </Grid>
//                     ))}

//                     <Grid item xs={12}>
//                       <Button variant="outlined" color="primary" onClick={addField}>
//                         + Add Input Field
//                       </Button>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="MRP*"
//                         type="number"
//                         value={variant.pricing.mrp}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "pricing.mrp",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Selling Price*"
//                         type="number"
//                         value={variant.pricing.price}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "pricing.price",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Total Stock*"
//                         type="number"
//                         value={variant.inventory?.totalStock || 0}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "inventory.totalStock",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Low Stock Threshold"
//                         type="number"
//                         value={variant.inventory?.lowStockThreshold || 5}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "inventory.lowStockThreshold",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={variant.isDefault}
//                             onChange={(e) =>
//                               handleVariantChange(
//                                 index,
//                                 "isDefault",
//                                 e.target.checked
//                               )
//                             }
//                           />
//                         }
//                         label="Default Variant"
//                       />
//                     </Grid>

//                     {/* Weight Fields */}
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Weight Value"
//                         type="number"
//                         value={variant.weight.value}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "weight.value",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <FormControl fullWidth margin="normal">
//                         <InputLabel>Weight Unit</InputLabel>
//                         <Select
//                           value={variant.weight.unit}
//                           onChange={(e) =>
//                             handleVariantChange(
//                               index,
//                               "weight.unit",
//                               e.target.value
//                             )
//                           }
//                         >
//                           <MenuItem value="g">Grams (g)</MenuItem>
//                           <MenuItem value="kg">Kilograms (kg)</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Grid>

//                     {/* Dimensions Fields */}
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         fullWidth
//                         label="Length"
//                         type="number"
//                         value={variant.dimensions.l}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "dimensions.l",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         fullWidth
//                         label="Width"
//                         type="number"
//                         value={variant.dimensions.w}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "dimensions.w",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         fullWidth
//                         label="Height"
//                         type="number"
//                         value={variant.dimensions.h}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "dimensions.h",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                       <FormControl fullWidth margin="normal">
//                         <InputLabel>Dimension Unit</InputLabel>
//                         <Select
//                           value={variant.dimensions.unit}
//                           onChange={(e) =>
//                             handleVariantChange(
//                               index,
//                               "dimensions.unit",
//                               e.target.value
//                             )
//                           }
//                         >
//                           <MenuItem value="cm">Centimeters (cm)</MenuItem>
//                           <MenuItem value="in">Inches (in)</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Grid>

//                     {/* Barcode Fields */}
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="UPC"
//                         value={variant.barcode.upc || ""}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "barcode.upc",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="EAN"
//                         value={variant.barcode.ean || ""}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "barcode.ean",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="GTIN"
//                         value={variant.barcode.gtin || ""}
//                         onChange={(e) =>
//                           handleVariantChange(
//                             index,
//                             "barcode.gtin",
//                             e.target.value
//                           )
//                         }
//                         margin="normal"
//                       />
//                     </Grid>

//                     {/* Variant Images */}
//                     <Grid item xs={12}>
//                       <Typography variant="subtitle2" gutterBottom>
//                         Variant Images
//                       </Typography>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={(e) => handleVariantImageUpload(e, index)}
//                         style={{ marginBottom: 16 }}
//                       />
//                       <Grid container spacing={1}>
//                         {variant?.previewImages?.map((img, idx) => (
//                           <Grid item key={idx} position="relative">
//                             <img
//                               src={img}
//                               alt={`variant-preview-${idx}`}
//                               style={{
//                                 width: 100,
//                                 height: 100,
//                                 objectFit: "cover",
//                                 borderRadius: 4,
//                               }}
//                             />
//                             <IconButton
//                               size="small"
//                               style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 right: 0,
//                                 backgroundColor: "rgba(255,255,255,0.7)",
//                               }}
//                               onClick={() => removeVariantImage(index, idx)}
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </IconButton>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   {variants.length > 1 && (
//                     <Button
//                       onClick={() => removeVariant(index)}
//                       startIcon={<DeleteIcon />}
//                       color="error"
//                     >
//                       Remove Variant
//                     </Button>
//                   )}
//                 </Box>
//               ))}
//               <Button onClick={addVariant} startIcon={<AddIcon />}>
//                 Add Variant
//               </Button>
//             </Grid>

//             {/* Commerce Settings Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Commerce Settings
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={codAvailable}
//                         onChange={(e) => setCodAvailable(e.target.checked)}
//                       />
//                     }
//                     label="COD Available"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Minimum Order Quantity"
//                     type="number"
//                     value={minOrderQty}
//                     onChange={(e) =>
//                       setMinOrderQty(parseInt(e.target.value) || 1)
//                     }
//                     margin="normal"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Maximum Order Quantity"
//                     type="number"
//                     value={maxOrderQty}
//                     onChange={(e) =>
//                       setMaxOrderQty(parseInt(e.target.value) || 10)
//                     }
//                     margin="normal"
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Return Policy Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Return Policy
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={returnPolicy.eligible}
//                         onChange={(e) =>
//                           setReturnPolicy({
//                             ...returnPolicy,
//                             eligible: e.target.checked,
//                           })
//                         }
//                       />
//                     }
//                     label="Eligible for Returns"
//                   />
//                 </Grid>
//                 {returnPolicy.eligible && (
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Return Window (Days)"
//                       type="number"
//                       value={returnPolicy.days}
//                       onChange={(e) =>
//                         setReturnPolicy({
//                           ...returnPolicy,
//                           days: parseInt(e.target.value) || 7,
//                         })
//                       }
//                       margin="normal"
//                     />
//                   </Grid>
//                 )}
//               </Grid>
//             </Grid>

//             {/* Warranty Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Warranty
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Warranty Type</InputLabel>
//                     <Select
//                       value={warranty.type}
//                       onChange={(e) =>
//                         setWarranty({ ...warranty, type: e.target.value })
//                       }
//                     >
//                       <MenuItem value="No Warranty">No Warranty</MenuItem>
//                       <MenuItem value="Seller">Seller</MenuItem>
//                       <MenuItem value="Manufacturer">Manufacturer</MenuItem>
//                       <MenuItem value="International">International</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Warranty Duration (Months)"
//                     type="number"
//                     value={warranty.durationMonths}
//                     onChange={(e) =>
//                       setWarranty({
//                         ...warranty,
//                         durationMonths: parseInt(e.target.value) || 0,
//                       })
//                     }
//                     margin="normal"
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Tax Information Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Tax Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="HSN Code"
//                     value={tax.hsn}
//                     onChange={(e) => setTax({ ...tax, hsn: e.target.value })}
//                     margin="normal"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="GST Rate (%)"
//                     type="number"
//                     value={tax.gstRate}
//                     onChange={(e) =>
//                       setTax({ ...tax, gstRate: parseInt(e.target.value) || 0 })
//                     }
//                     margin="normal"
//                     inputProps={{ min: 0, max: 28 }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Deal of the Day Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Deal of the Day
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={dealOfTheDay.status}
//                         onChange={(e) =>
//                           setDealOfTheDay({
//                             ...dealOfTheDay,
//                             status: e.target.checked,
//                           })
//                         }
//                       />
//                     }
//                     label="Enable Deal of the Day"
//                   />
//                 </Grid>
//                 {dealOfTheDay.status && (
//                   <>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Discount Percentage"
//                         type="number"
//                         value={dealOfTheDay.discountPercent}
//                         onChange={(e) =>
//                           setDealOfTheDay({
//                             ...dealOfTheDay,
//                             discountPercent: parseInt(e.target.value) || 0,
//                           })
//                         }
//                         margin="normal"
//                         inputProps={{ min: 0, max: 95 }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="body2" gutterBottom>
//                         Start Time
//                       </Typography>
//                       <DatePicker
//                         selected={dealOfTheDay.startTime}
//                         onChange={(date) =>
//                           setDealOfTheDay({ ...dealOfTheDay, startTime: date })
//                         }
//                         showTimeSelect
//                         timeFormat="HH:mm"
//                         timeIntervals={15}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         className="form-control"
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="body2" gutterBottom>
//                         End Time
//                       </Typography>
//                       <DatePicker
//                         selected={dealOfTheDay.endTime}
//                         onChange={(date) =>
//                           setDealOfTheDay({ ...dealOfTheDay, endTime: date })
//                         }
//                         showTimeSelect
//                         timeFormat="HH:mm"
//                         timeIntervals={15}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         className="form-control"
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         label="Variant SKUs (comma separated)"
//                         value={dealOfTheDay?.variantIds?.join(",")}
//                         onChange={(e) =>
//                           setDealOfTheDay({
//                             ...dealOfTheDay,
//                             variantIds: e.target.value
//                               .split(",")
//                               .map((s) => s.trim()),
//                           })
//                         }
//                         margin="normal"
//                         helperText="Leave empty to apply to all variants"
//                       />
//                     </Grid>
//                   </>
//                 )}
//               </Grid>
//             </Grid>

//             {/* SEO Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 SEO Settings
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Meta Title"
//                     value={metaTitle}
//                     onChange={(e) => setMetaTitle(e.target.value)}
//                     margin="normal"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     label="Meta Description"
//                     value={metaDescription}
//                     onChange={(e) => setMetaDescription(e.target.value)}
//                     margin="normal"
//                     multiline
//                     rows={3}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Tags
//                   </Typography>
//                   <Box display="flex" alignItems="center" mb={2}>
//                     <TextField
//                       value={currentTag}
//                       onChange={(e) => setCurrentTag(e.target.value)}
//                       label="Add Tag"
//                       margin="normal"
//                     />
//                     <Button onClick={addTag} sx={{ ml: 1, mt: 2 }}>
//                       Add
//                     </Button>
//                   </Box>
//                   <Box>
//                     {tags.map((tag, index) => (
//                       <Chip
//                         key={index}
//                         label={tag}
//                         onDelete={() => removeTag(index)}
//                         sx={{ mr: 1, mb: 1 }}
//                       />
//                     ))}
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     SEO Keywords
//                   </Typography>
//                   <Box display="flex" alignItems="center" mb={2}>
//                     <TextField
//                       value={currentKeyword}
//                       onChange={(e) => setCurrentKeyword(e.target.value)}
//                       label="Add Keyword"
//                       margin="normal"
//                     />
//                     <Button onClick={addKeyword} sx={{ ml: 1, mt: 2 }}>
//                       Add
//                     </Button>
//                   </Box>
//                   <Box>
//                     {metaKeywords.map((keyword, index) => (
//                       <Chip
//                         key={index}
//                         label={keyword}
//                         onDelete={() => removeKeyword(index)}
//                         sx={{ mr: 1, mb: 1 }}
//                       />
//                     ))}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Admin Settings Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Admin Settings
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Visibility</InputLabel>
//                     <Select
//                       value={visibility}
//                       onChange={(e) => setVisibility(e.target.value)}
//                     >
//                       <MenuItem value="PUBLIC">Public</MenuItem>
//                       <MenuItem value="PRIVATE">Private</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Status</InputLabel>
//                     <Select
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                     >
//                       <MenuItem value="DRAFT">Draft</MenuItem>
//                       <MenuItem value="ACTIVE">Active</MenuItem>
//                       <MenuItem value="INACTIVE">Inactive</MenuItem>
//                       <MenuItem value="ARCHIVED">Archived</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <SnackbarContent
//           message={snackbarMessage}
//           style={{
//             backgroundColor: snackbarSeverity === "success" ? "green" : "red",
//           }}
//         />
//       </Snackbar>
//     </div>
//   );
// };

// export default ProductForm;

export const ProductForm = ({ isOpen, onClose, initialData }) => {
  const { user, categories } = useUser();
  const allCategories = categories?.filter(data => data.name)

  const classes = useStyles();

  const [activeTab, setActiveTab] = useState("basic");
  const [brands, setBrands] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Main product state
  const [productData, setProductData] = useState({
    productName: "",
    referenceWebsite: user?.referenceWebsite,
    brand: "",
    category: "",
    description: "",
    keyFeatures: [""],
    specs: [{ group: "", key: "", value: "", unit: "" }],
    images: [],
    variants: [
      {
        sku: "",
        options: {},
        images: [],
        pricing: { mrp: 0, price: 0, currency: "INR" },
        inventory: { totalStock: 0, lowStockThreshold: 5 },
        status: "IN_STOCK",
        weight: { value: 0, unit: "g" },
        dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
        isDefault: true,
      },
    ],
    dealOfTheDay: {
      status: false,
      startTime: "",
      endTime: "",
      discountPercent: 0,
      variantIds: [],
    },
    codAvailable: true,
    minOrderQty: 1,
    maxOrderQty: 10,
    returnPolicy: { eligible: true, days: 7 },
    warranty: { type: "Manufacturer", durationMonths: 0 },
    tax: { hsn: "", gstRate: 0 },
    discount: 0,
    tags: [""],
    attributesFlat: {},
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [""],
      canonicalUrl: "",
    },
    status: "ACTIVE",
    visibility: "PUBLIC",
  });

  // Fetch dropdown data
  useEffect(() => {
    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Pre-fill form when editing - make sure to use IDs for category and brand
        const formattedData = {
          ...initialData,
          // Ensure category and brand are set to their IDs
          category: initialData.category?._id || initialData.category || "",
          brand: initialData.brand?._id || initialData.brand || "",
        };
        setProductData(formattedData);
      } else {
        // Reset form when adding
        setProductData({
          productName: "",
          referenceWebsite: user?.referenceWebsite,
          brand: "",
          category: "",
          description: "",
          keyFeatures: [""],
          specs: [{ group: "", key: "", value: "", unit: "" }],
          images: [],
          variants: [
            {
              sku: "",
              options: {},
              images: [],
              pricing: { mrp: 0, price: 0, currency: "INR" },
              inventory: { totalStock: 0, lowStockThreshold: 5 },
              status: "IN_STOCK",
              weight: { value: 0, unit: "g" },
              dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
              isDefault: true,
            },
          ],
          dealOfTheDay: {
            status: false,
            startTime: "",
            endTime: "",
            discountPercent: 0,
            variantIds: [],
          },
          codAvailable: true,
          minOrderQty: 1,
          maxOrderQty: 10,
          returnPolicy: { eligible: true, days: 7 },
          warranty: { type: "Manufacturer", durationMonths: 0 },
          tax: { hsn: "", gstRate: 0 },
          discount: 0,
          tags: [""],
          attributesFlat: {},
          seo: {
            metaTitle: "",
            metaDescription: "",
            metaKeywords: [""],
            canonicalUrl: "",
          },
          status: "ACTIVE",
          visibility: "PUBLIC",
        });
      }

      // Always reset uploadedImages when opening
      setUploadedImages({});
    }
  }, [isOpen, initialData, user?.referenceWebsite]);

  const fetchBrands = async () => {
    try {
      const response = await apiGet("/api/brand/getbrand");
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setProductData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProductData((prev) => {
      const variants = [...prev.variants];
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        variants[index][parent] = {
          ...variants[index][parent],
          [child]: value,
        };
      } else {
        variants[index][field] = value;
      }
      return { ...prev, variants };
    });
  };

  const handleAddTag = () => {
    const input = document.getElementById("new-tag");
    if (input.value) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, input.value],
      }));
      input.value = ""; // Clear the input after adding the tag
    }
  };

  const handleRemoveTag = (index) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle image uploads
  const handleImageUpload = (e, variantIndex = null) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadedImages((prev) => {
      const key = variantIndex !== null ? `variant_${variantIndex}` : "product";
      return {
        ...prev,
        [key]: [...(prev[key] || []), ...files],
      };
    });
  };

  // Remove image
  const removeImage = (imageIndex, variantIndex = null) => {
    if (variantIndex !== null) {
      setProductData((prev) => {
        const variants = [...prev.variants];
        variants[variantIndex].images = variants[variantIndex].images.filter(
          (_, i) => i !== imageIndex
        );
        return { ...prev, variants };
      });
    } else {
      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== imageIndex),
      }));
    }
  };

  // Add/remove variants
  const addVariant = () => {
    setProductData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: "",
          options: {},
          images: [],
          pricing: { mrp: 0, price: 0, currency: "INR" },
          inventory: { totalStock: 0, lowStockThreshold: 5 },
          status: "IN_STOCK",
          weight: { value: 0, unit: "g" },
          dimensions: { l: 0, w: 0, h: 0, unit: "cm" },
          isDefault: false,
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (productData.variants.length <= 1) return;

    setProductData((prev) => {
      const variants = [...prev.variants];
      variants.splice(index, 1);
      if (variants.length > 0 && !variants.some((v) => v.isDefault)) {
        variants[0].isDefault = true;
      }
      return { ...prev, variants };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));

    // Add product images
    if (uploadedImages.product) {
      uploadedImages.product.forEach((file) => {
        formData.append("images", file);
      });
    }

    // Add variant images
    productData.variants.forEach((variant, index) => {
      if (uploadedImages[`variant_${index}`]) {
        uploadedImages[`variant_${index}`].forEach((file) => {
          formData.append(`variantImages_${index}`, file);
        });
      }
    });

    try {
      if (initialData?._id) {
        // Update existing product
        const response = await apiPut(
          `/api/product/products/${initialData._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSnackbarMessage(
          response?.data?.message || "Product updated successfully!"
        );
        setSnackbarSeverity("success");
      } else {
        // Create new product
        const response = await apiPost("/api/product/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbarMessage(
          response?.data?.message || "Product created successfully!"
        );
        setSnackbarSeverity("success");
      }

      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      setSnackbarMessage(error.response?.data?.message || "Request failed");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="pm-overlay">
      <div className="pm-dialog">
        {/* Header */}
        <div className="pm-header">
          <h2> {initialData ? "Edit Product" : "Add New Product"} </h2>
          <Button
            onClick={onClose}
            className="pm-close pm-focusable"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* Tabs */}
        <div className="pm-tabs">
          <nav className="pm-tabs__list">
            {[
              "basic",
              "content",
              "variants",
              "pricing",
              "shipping",
              "seo",
              "advanced",
            ].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pm-tab ${activeTab === tab ? "pm-tab--active" : ""
                  }`}
              >
                {tab}
              </Button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="pm-section">
          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name *"
                  name="productName"
                  value={productData.productName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className={classes.selectInput}
                  >
                    <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    {allCategories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                    className={classes.selectInput}
                  >
                    <MenuItem value="">
                      <em>Select Brand</em>
                    </MenuItem>
                    {brands?.map((brand) => (
                      <MenuItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={productData.status}
                    onChange={handleInputChange}
                    className={classes.selectInput}
                  >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="DRAFT">Draft</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                    <MenuItem value="ARCHIVED">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Visibility</InputLabel>
                  <Select
                    name="visibility"
                    value={productData.visibility}
                    onChange={handleInputChange}
                    className={classes.selectInput}
                  >
                    <MenuItem value="PUBLIC">Public</MenuItem>
                    <MenuItem value="PRIVATE">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Product Images */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Product Images</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {productData.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 1,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Product ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(255,255,255,0.7)",
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      height: 100,
                      width: 100,
                      borderStyle: "dashed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    + Add
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Variants Tab */}
          {activeTab === "variants" && (
            <Box>
              {productData.variants.map((variant, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  {/* Card header */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6">Variant {index + 1}</Typography>
                    <Box display="flex" gap={1} alignItems="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={variant.isDefault}
                            onChange={(e) => {
                              const newVariants = productData.variants.map(
                                (v, i) => ({
                                  ...v,
                                  isDefault:
                                    i === index ? e.target.checked : false,
                                })
                              );
                              setProductData((prev) => ({
                                ...prev,
                                variants: newVariants,
                              }));
                            }}
                          />
                        }
                        label="Default Variant"
                      />
                      {productData.variants.length > 1 && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => removeVariant(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {/* Variant details */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="SKU"
                        value={variant.sku}
                        onChange={(e) =>
                          handleVariantChange(index, "sku", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
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

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Stock Quantity"
                        value={variant.inventory.totalStock}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "inventory.totalStock",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Low Stock Threshold"
                        value={variant.inventory.lowStockThreshold}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "inventory.lowStockThreshold",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Variant Images */}
                  <Box mt={2}>
                    <Typography variant="subtitle1">Variant Images</Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                      {variant.images.map((image, imgIndex) => (
                        <Box
                          key={imgIndex}
                          sx={{
                            position: "relative",
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 1,
                          }}
                        >
                          <img
                            src={image}
                            alt={`Variant ${index} ${imgIndex}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              bgcolor: "rgba(255,255,255,0.7)",
                            }}
                            onClick={() => removeImage(imgIndex, index)}
                          >
                            ×
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{
                          height: 100,
                          width: 100,
                          borderStyle: "dashed",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        + Add
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={(e) => handleImageUpload(e, index)}
                        />
                      </Button>
                    </Box>
                  </Box>

                  {/* Variant Options */}
                  <Box mt={3}>
                    <Typography variant="subtitle1">Variant Options</Typography>
                    <Box display="flex" flexDirection="column" gap={1} mt={1}>
                      {Object.entries(variant?.options ?? {}).map(([key, value]) => (
                        <Box
                          key={key}
                          display="flex"
                          gap={1}
                          alignItems="center"
                        >
                          <Typography variant="body2">
                            {key}: {value}
                          </Typography>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => {
                              const newOptions = { ...variant.options };
                              delete newOptions[key];
                              handleVariantChange(index, "options", newOptions);
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}

                      <Box display="flex" gap={1}>
                        <TextField
                          size="small"
                          placeholder="Option name (e.g., Color)"
                          id={`option-key-${index}`}
                        />
                        <TextField
                          size="small"
                          placeholder="Option value (e.g., Red)"
                          id={`option-value-${index}`}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => {
                            const keyInput = document.getElementById(
                              `option-key-${index}`
                            );
                            const valueInput = document.getElementById(
                              `option-value-${index}`
                            );
                            if (keyInput.value && valueInput.value) {
                              handleVariantChange(index, "options", {
                                ...variant.options,
                                [keyInput.value]: valueInput.value,
                              });
                              keyInput.value = "";
                              valueInput.value = "";
                            }
                          }}
                        >
                          Add Option
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* Weight & Dimensions */}
                  <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Weight
                      </Typography>
                      <Box display="flex" gap={1}>
                        <TextField
                          type="number"
                          placeholder="Value"
                          value={variant.weight.value}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "weight.value",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <FormControl sx={{ minWidth: 100 }}>
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
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="kg">kg</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Dimensions
                      </Typography>
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(3,1fr)"
                        gap={1}
                      >
                        <TextField
                          type="number"
                          placeholder="Length"
                          value={variant.dimensions.l}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "dimensions.l",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <TextField
                          type="number"
                          placeholder="Width"
                          value={variant.dimensions.w}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "dimensions.w",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <TextField
                          type="number"
                          placeholder="Height"
                          value={variant.dimensions.h}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "dimensions.h",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </Box>
                      <FormControl fullWidth sx={{ mt: 1 }}>
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
                          <MenuItem value="cm">cm</MenuItem>
                          <MenuItem value="in">in</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={addVariant}
                sx={{ mt: 2 }}
              >
                + Add Another Variant
              </Button>
            </Box>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <Box>
              {/* Global Pricing */}
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discount (%)"
                    name="discount"
                    inputProps={{ min: 0, max: 100 }}
                    value={productData.discount}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Tax (GST Rate %)"
                    inputProps={{ min: 0, max: 28 }}
                    value={productData.tax.gstRate}
                    onChange={(e) =>
                      handleNestedChange(
                        "tax",
                        "gstRate",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="HSN Code"
                    value={productData.tax.hsn}
                    onChange={(e) =>
                      handleNestedChange("tax", "hsn", e.target.value)
                    }
                  />
                </Grid>
              </Grid>

              {/* Variant Pricing */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Variant Pricing
                </Typography>
                {productData.variants.map((variant, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    sx={{
                      mb: 2,
                      border: "1px solid #eee",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography fontWeight={600}>
                        Variant: {variant.sku || `#${index + 1}`}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        required
                        type="number"
                        label="MRP *"
                        inputProps={{ min: 0, step: "0.01" }}
                        value={variant.pricing.mrp}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "pricing.mrp",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        required
                        type="number"
                        label="Selling Price *"
                        inputProps={{ min: 0, step: "0.01" }}
                        value={variant.pricing.price}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "pricing.price",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        select
                        fullWidth
                        label="Currency"
                        value={variant.pricing.currency}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "pricing.currency",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="INR">INR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <Box>
              {/* Description */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Description *
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={productData.description}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "description", value },
                    })
                  }
                  placeholder="Enter product description"
                  style={{
                    background: "#fff",
                    borderRadius: 4,
                    width: "100%",
                    height: "200px",
                    marginBottom: "40px",
                  }}
                />
              </Box>

              {/* Key Features */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Key Features
                </Typography>
                {productData.keyFeatures.map((feature, index) => (
                  <Box
                    key={index}
                    display="flex"
                    gap={1}
                    alignItems="center"
                    mb={1}
                  >
                    <TextField
                      fullWidth
                      placeholder="Feature description"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...productData.keyFeatures];
                        newFeatures[index] = e.target.value;
                        setProductData((prev) => ({
                          ...prev,
                          keyFeatures: newFeatures,
                        }));
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        const newFeatures = productData.keyFeatures.filter(
                          (_, i) => i !== index
                        );
                        setProductData((prev) => ({
                          ...prev,
                          keyFeatures: newFeatures,
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}

                <Button
                  variant="outlined"
                  onClick={() =>
                    setProductData((prev) => ({
                      ...prev,
                      keyFeatures: [...prev.keyFeatures, ""],
                    }))
                  }
                >
                  Add Feature
                </Button>
              </Box>

              {/* Specifications */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Specifications
                </Typography>
                {productData.specs.map((spec, index) => (
                  <Grid
                    container
                    spacing={1}
                    key={index}
                    sx={{
                      mb: 2,
                      border: "1px solid #eee",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        placeholder="Group"
                        value={spec.group}
                        onChange={(e) => {
                          const newSpecs = [...productData.specs];
                          newSpecs[index].group = e.target.value;
                          setProductData((prev) => ({
                            ...prev,
                            specs: newSpecs,
                          }));
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        placeholder="Key"
                        value={spec.key}
                        onChange={(e) => {
                          const newSpecs = [...productData.specs];
                          newSpecs[index].key = e.target.value;
                          setProductData((prev) => ({
                            ...prev,
                            specs: newSpecs,
                          }));
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...productData.specs];
                          newSpecs[index].value = e.target.value;
                          setProductData((prev) => ({
                            ...prev,
                            specs: newSpecs,
                          }));
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} display="flex" gap={1}>
                      <TextField
                        fullWidth
                        placeholder="Unit"
                        value={spec.unit}
                        onChange={(e) => {
                          const newSpecs = [...productData.specs];
                          newSpecs[index].unit = e.target.value;
                          setProductData((prev) => ({
                            ...prev,
                            specs: newSpecs,
                          }));
                        }}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          const newSpecs = productData.specs.filter(
                            (_, i) => i !== index
                          );
                          setProductData((prev) => ({
                            ...prev,
                            specs: newSpecs,
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  variant="outlined"
                  onClick={() =>
                    setProductData((prev) => ({
                      ...prev,
                      specs: [
                        ...prev.specs,
                        { group: "", key: "", value: "", unit: "" },
                      ],
                    }))
                  }
                >
                  Add Specification
                </Button>
              </Box>
            </Box>
          )}

          {/* Shipping Tab */}
          {activeTab === "shipping" && (
            <Box>
              {/* Order Qty + COD */}
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Min Order Qty"
                    name="minOrderQty"
                    inputProps={{ min: 1 }}
                    value={productData.minOrderQty}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Order Qty"
                    name="maxOrderQty"
                    inputProps={{ min: 1 }}
                    value={productData.maxOrderQty}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4} display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="codAvailable"
                        checked={productData.codAvailable}
                        onChange={handleInputChange}
                      />
                    }
                    label="COD Available"
                  />
                </Grid>
              </Grid>

              {/* Return Policy */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Return Policy
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={productData.returnPolicy.eligible}
                          onChange={(e) =>
                            handleNestedChange(
                              "returnPolicy",
                              "eligible",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Eligible for Returns"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Return Period (Days)"
                      inputProps={{ min: 0 }}
                      value={productData.returnPolicy.days}
                      onChange={(e) =>
                        handleNestedChange(
                          "returnPolicy",
                          "days",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Warranty */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Warranty
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Warranty Type"
                      value={productData.warranty.type}
                      onChange={(e) =>
                        handleNestedChange("warranty", "type", e.target.value)
                      }
                    >
                      <MenuItem value="No Warranty">No Warranty</MenuItem>
                      <MenuItem value="Seller">Seller</MenuItem>
                      <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                      <MenuItem value="International">International</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Duration (Months)"
                      inputProps={{ min: 0 }}
                      value={productData.warranty.durationMonths}
                      onChange={(e) =>
                        handleNestedChange(
                          "warranty",
                          "durationMonths",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}

          {/* SEO Tab */}
          {activeTab === "seo" && (
            <Box>
              {/* Meta Title */}
              <Box mb={3}>
                <TextField
                  fullWidth
                  label="Meta Title"
                  value={productData.seo.metaTitle}
                  onChange={(e) =>
                    handleNestedChange("seo", "metaTitle", e.target.value)
                  }
                />
              </Box>

              {/* Meta Description */}
              <Box mb={3}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Meta Description"
                  value={productData.seo.metaDescription}
                  onChange={(e) =>
                    handleNestedChange("seo", "metaDescription", e.target.value)
                  }
                />
              </Box>

              {/* Meta Keywords */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Meta Keywords
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {productData.seo.metaKeywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      onDelete={() => {
                        const newKeywords = productData.seo.metaKeywords.filter(
                          (_, i) => i !== index
                        );
                        handleNestedChange("seo", "metaKeywords", newKeywords);
                      }}
                      color="default"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box display="flex" gap={1}>
                  <TextField
                    id="new-keyword"
                    placeholder="Add keyword"
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const input = document.getElementById("new-keyword");
                      if (input.value) {
                        handleNestedChange("seo", "metaKeywords", [
                          ...productData.seo.metaKeywords,
                          input.value,
                        ]);
                        input.value = "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              {/* Canonical URL */}
              <Box mb={3}>
                <TextField
                  fullWidth
                  type="url"
                  label="Canonical URL"
                  value={productData.seo.canonicalUrl}
                  onChange={(e) =>
                    handleNestedChange("seo", "canonicalUrl", e.target.value)
                  }
                />
              </Box>
            </Box>
          )}

          {/* Advanced Tab */}
          {activeTab === "advanced" && (
            <Box>
              {/* Tags */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Tags
                </Typography>

                {/* Existing Tags */}
                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {productData.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => {
                        const newTags = productData.tags.filter(
                          (_, i) => i !== index
                        );
                        setProductData((prev) => ({
                          ...prev,
                          tags: newTags,
                        }));
                      }}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Add New Tag */}
                <Box display="flex" gap={1}>
                  <TextField
                    id="new-tag"
                    placeholder="Add tag"
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const input = document.getElementById("new-tag");
                      if (input.value) {
                        setProductData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, input.value],
                        }));
                        input.value = "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              {/* Deal of the Day */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Deal of the Day
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={productData.dealOfTheDay.status}
                          onChange={(e) =>
                            handleNestedChange(
                              "dealOfTheDay",
                              "status",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Active"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label="Discount Percent"
                      inputProps={{ min: 0, max: 95 }}
                      value={productData.dealOfTheDay.discountPercent}
                      onChange={(e) =>
                        handleNestedChange(
                          "dealOfTheDay",
                          "discountPercent",
                          parseInt(e.target.value)
                        )
                      }
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      label="Start Time"
                      InputLabelProps={{ shrink: true }}
                      value={productData.dealOfTheDay.startTime}
                      onChange={(e) =>
                        handleNestedChange(
                          "dealOfTheDay",
                          "startTime",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      label="End Time"
                      InputLabelProps={{ shrink: true }}
                      value={productData.dealOfTheDay.endTime}
                      onChange={(e) =>
                        handleNestedChange(
                          "dealOfTheDay",
                          "endTime",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}

          {/* Form Actions */}
          <div
            className="pm-divider"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: ".75rem",
            }}
          >
            <Button
              type="button"
              onClick={onClose}
              className="pm-btn pm-btn--secondary"
            >
              Cancel
            </Button>
            <Button type="submit" className="pm-btn pm-btn--primary">
              {initialData ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
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
