const UserService = require("../../services/setting/userService");
const jwt = require("jsonwebtoken");

class UserController {
  async resolveAllUsers(req, res) {
    try {
      const filters = {
        pageSize: parseInt(req.query.pageSize) || 10,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        idRole: req.query.idRole,
        q: req.query.q,
        sortBy: req.query.sortBy || "id",
        sortType: req.query.sortType || "ASC",
      };

      const { users, totalItems } = await UserService.resolveAllUsers(filters);

      const totalPage = Math.ceil(totalItems / filters.pageSize);
      const currentPage = filters.pageNumber;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPage ? currentPage + 1 : null;

      const response = {
        data: {
          items: users.map((item) => ({
            id: item.id,
            user: item.user,
            username: item.username,
            idRole: item.id_role,
            role: item.role,
            kode: item.kode,
            kode_customer: item.kode_customer
          })),
          meta: {
            totalItems,
            totalPage,
            previousPage,
            currentPage,
            nextPage,
            limitPerPage: filters.pageSize,
          },
        },
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { nama, username, password, idRole } = req.body;

      if (!nama || !username || !password || !idRole) {
        return res
          .status(400)
          .json({ message: "Ada data yang belum dilengkapi" });
      }

      const newUser = await UserService.createUser({
        nama,
        username,
        password,
        idRole,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json({
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await UserService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({
          data: {
            message: "User tidak ditemukan",
            success: false,
          },
        });
      }

      res.json({
        data: {
          message: "Data Berhasil di Hapus",
          success: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
          success: false,
        },
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Cari pengguna berdasarkan username
      const user = await UserService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verifikasi password
      const isPasswordValid = await UserService.verifyPassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Buat token JWT dengan payload tambahan
      const token = jwt.sign(
        {
          userId: user.id,
          roleId: user.role ? user.role.id : null,
          nama: user.nama,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      // Susun data respons seperti yang diminta
      const response = {
        data: {
          token: {
            AccessToken: token,
          },
          user: {
            id: user.id,
            username: user.username,
            idRole: user.id_role ? user.id_role : null,
            nama: user.user || null,
            idCustomer: user.id_customer || null,
            kodeCustomer: user.kode_customer || null,
            customer: user.customer || null,
            alamat: user.alamat || null,
            noTelp: user.no_telp || null,
            email: user.email || null,
            npwp: user.npwp || null,
            role: user.role
              ? {
                  id: user.id_role,
                  name: user.role,
                  kode: user.kode,
                }
              : null,
          },
        },
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await UserService.getUserByUsername(username);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const { id } = req.params; // ID user dari parameter
      const { newPassword } = req.body; // Password baru dari body request
  
      if (!newPassword) {
        return res.status(400).json({ message: "Password baru harus diisi" });
      }
  
      // Panggil service untuk memperbarui password
      await UserService.updatePassword(id, newPassword);
  
      res.json({
        data: {
          message: "Password berhasil diperbarui",
          success: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        data: {
          message: error.message,
          success: false,
        },
      });
    }
  }
  

  
}

module.exports = new UserController();
