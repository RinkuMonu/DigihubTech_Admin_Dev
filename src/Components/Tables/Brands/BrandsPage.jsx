import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Button,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  EditOutlined,
  AddOutlined,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { apiGet, apiDelete, apiPost, apiPut } from "../../../api/apiMethods";
import { useUser } from "../../../Context/UserContext";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [filterWebsite, setFilterWebsite] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    slug: "",
    status: "ACTIVE",
    referenceWebsite: "",
  });

  const { user } = useUser();

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const res = await apiGet(`api/brand/getbrand`);
      setBrands(res.data?.data || []);
      console.log(res.data.data);

      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      setBrands([]);
    }
  };

  // Fetch websites for super-admin
  const fetchWebsites = async () => {
    try {
      const res = await apiGet("api/website");
      setWebsites(res.data?.websites || []);
      if (res.data?.websites.length > 0) {
        setFilterWebsite(res.data.websites[0]._id);
      }
    } catch (err) {
      console.error("Failed to fetch websites:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === "super-admin") {
      fetchWebsites();
    } else {
      setFilterWebsite(user.referenceWebsite);
    }
  }, [user]);

  useEffect(() => {
    if (filterWebsite) fetchBrands();
  }, [filterWebsite, searchInput, currentPage]);

  // Delete
  const handleDelete = async () => {
    try {
      const res = await apiDelete(`api/brand/brandDelete/${deleteId}`);
      if (res.status === 200) {
        fetchBrands();
        setDialogOpen(false);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Open Add form
  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      logo: "",
      slug: "",
      status: "ACTIVE",
      referenceWebsite: filterWebsite,
    });
    setEditId(null);
    setFormOpen(true);
  };

  // Open Edit form
  const handleEdit = (brand) => {
    setFormData({
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      slug: brand.slug,
      status: brand.status,
      referenceWebsite: brand.referenceWebsite,
    });
    setEditId(brand._id);
    setFormOpen(true);
  };

  // Save (Add or Edit)
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("slug", formData.slug);
      data.append("status", formData.status);
      data.append("referenceWebsite", formData.referenceWebsite);

      // Agar nayi file select hui hai toh append karo
      if (formData.logo instanceof File) {
        data.append("logo", formData.logo);
      }

      if (editId) {
        await apiPut(`api/brand/updateBrand/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await apiPost(`api/brand/createBrand`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormOpen(false);
      fetchBrands();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5" sx={{ fontWeight: "600", color: "#2a4172" }}>
          Brands
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={handleAdd}
        >
          Add Brand
        </Button>
      </Grid>
      <Divider sx={{ my: 2 }} />

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {user?.role === "super-admin" && (
          <Grid item xs={6} md={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>Reference Website</InputLabel>
              <Select
                value={filterWebsite}
                onChange={(e) => setFilterWebsite(e.target.value)}
              >
                {websites.map((site) => (
                  <MenuItem key={site._id} value={site._id}>
                    {site.websiteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fbe5ec" }}>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No brands found.
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand, index) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    {index + 1 + (currentPage - 1) * pageSize}
                  </TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{brand.description}</TableCell>
                  <TableCell>{brand.slug}</TableCell>
                  <TableCell>{brand.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(brand)}>
                      <EditOutlined />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteId(brand._id);
                        setDialogOpen(true);
                      }}
                    >
                      <DeleteForeverOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Delete dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Brand</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this brand?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={deleteLoading}
            startIcon={
              deleteLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Form */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editId ? "Edit Brand" : "Add Brand"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Logo
            <input
              type="file"
              hidden
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.files[0] })
              }
            />
          </Button>
          {formData.logo && typeof formData.logo === "string" ? (
            <img
              src={formData.logo}
              alt="logo"
              style={{ width: 50, marginTop: 5 }}
            />
          ) : formData.logo instanceof File ? (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {formData.logo.name}
            </Typography>
          ) : null}

          <TextField
            margin="dense"
            label="Slug"
            fullWidth
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
          {user?.role === "super-admin" && (
            <FormControl margin="dense" fullWidth>
              <InputLabel>Reference Website</InputLabel>
              <Select
                value={formData.referenceWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, referenceWebsite: e.target.value })
                }
              >
                {websites.map((site) => (
                  <MenuItem key={site._id} value={site._id}>
                    {site.websiteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} disabled={saveLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saveLoading}
            startIcon={
              saveLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandsPage;
