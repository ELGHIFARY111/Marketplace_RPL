const axios = require("axios");

const BASE_URL = process.env.RAJAONGKIR_BASE_URL;
const API_KEY = process.env.RAJAONGKIR_API_KEY;
const ORIGIN_ID = process.env.ORIGIN_ID;

const searchDestination = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        message: "Keyword lokasi wajib diisi",
      });
    }

    const response = await axios.get(
      `${BASE_URL}/destination/domestic-destination`,
      {
        params: {
          search,
          limit: 10,
          offset: 0,
        },
        headers: {
          key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("RajaOngkir search error:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      message: "Gagal mencari lokasi RajaOngkir",
      error: error.response?.data || error.message,
    });
  }
};

const calculateCost = async (req, res) => {
  try {
    const { destination, weight, courier } = req.body;

    if (!destination || !weight || !courier) {
      return res.status(400).json({
        message: "destination, weight, dan courier wajib diisi",
      });
    }

    if (!ORIGIN_ID) {
      return res.status(500).json({
        message: "ORIGIN_ID belum diisi di file .env",
      });
    }

    const formData = new URLSearchParams();
    formData.append("origin", ORIGIN_ID);
    formData.append("destination", destination);
    formData.append("weight", weight);
    formData.append("courier", courier);
    formData.append("price", "lowest");

    const response = await axios.post(
      `${BASE_URL}/calculate/domestic-cost`,
      formData,
      {
        headers: {
          key: API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("RajaOngkir cost error:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      message: "Gagal menghitung ongkir RajaOngkir",
      error: error.response?.data || error.message,
    });
  }
};
const getProvinces = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/destination/province`, {
      headers: {
        key: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Gagal mengambil provinsi",
      error: error.response?.data || error.message,
    });
  }
};

const getCities = async (req, res) => {
  try {
    const { provinceId } = req.params;

    const response = await axios.get(
      `${BASE_URL}/destination/city/${provinceId}`,
      {
        headers: {
          key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Gagal mengambil kabupaten/kota",
      error: error.response?.data || error.message,
    });
  }
};

const getDistricts = async (req, res) => {
  try {
    const { cityId } = req.params;

    const response = await axios.get(
      `${BASE_URL}/destination/district/${cityId}`,
      {
        headers: {
          key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Gagal mengambil kecamatan",
      error: error.response?.data || error.message,
    });
  }
};

const getSubdistricts = async (req, res) => {
  try {
    const { districtId } = req.params;

    const response = await axios.get(
      `${BASE_URL}/destination/sub-district/${districtId}`,
      {
        headers: {
          key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Gagal mengambil desa/kelurahan",
      error: error.response?.data || error.message,
    });
  }
};
module.exports = {
  searchDestination,
  calculateCost,
  getProvinces,
  getCities,
  getDistricts,
  getSubdistricts,
};