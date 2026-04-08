const pool = require('../config/db');
const { haversineDistance } = require('../utils/distance');

// POST /addSchool
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (error) {
    console.error('addSchool error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /listSchools?latitude=xx&longitude=xx
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
        success: false,
        message: 'latitude and longitude query params must be valid numbers',
      });
    }

    if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message: 'latitude must be -90 to 90, longitude must be -180 to 180',
      });
    }

    const [schools] = await pool.execute('SELECT * FROM schools');

    // Attach distance to each school, then sort ascending
    const sorted = schools
      .map(school => ({
        ...school,
        distance_km: parseFloat(
          haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: `Found ${sorted.length} school(s)`,
      user_location: { latitude: userLat, longitude: userLon },
      data: sorted,
    });
  } catch (error) {
    console.error('listSchools error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { addSchool, listSchools };