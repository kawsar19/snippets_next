"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeSnippet from "./CodeSnippet";
import { getAccessTokenFromCookies } from "@/actions/actions";

const GistDetails = ({ id }) => {
  const [gist, setGist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    description: "",
    files: {},
  });
  const fetchGistDetails = async () => {
    const token = await getAccessTokenFromCookies();
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(`https://api.github.com/gists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGist(response.data);
      setEditData({
        description: response.data.description || "",
        files: response.data.files,
      });
    } catch (error) {
      console.error("Error fetching gist details:", error);
    }
  };
  useEffect(() => {
    fetchGistDetails();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (fileName, e) => {
    setEditData((prevData) => ({
      ...prevData,
      files: {
        ...prevData.files,
        [fileName]: {
          ...prevData.files[fileName],
          content: e.target.value,
        },
      },
    }));
  };

  const handleSaveChanges = async () => {
    const token = await getAccessTokenFromCookies();
    if (!token) {
      return;
    }
    try {
      await axios.patch(
        `https://api.github.com/gists/${id}`,
        {
          description: editData.description,
          files: Object.keys(editData.files).reduce((acc, fileName) => {
            acc[fileName] = {
              ...editData.files[fileName],
              content: editData.files[fileName].content,
            };
            return acc;
          }, {}),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update local state
      fetchGistDetails();
      handleModalClose();
    } catch (error) {
      console.error("Error updating gist:", error);
    }
  };

  if (!gist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {gist.description || "No Description"}
      </h1>
      <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      <div className="bg-white p-4 rounded shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-2">Files:</h2>
        {Object.keys(gist.files).map((file) => (
          <div key={file} className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-red-700 bg-red-100 w-max p-1 rounded px-2">
              {gist.files[file].filename}
            </h3>
            <CodeSnippet
              rawUrl={gist.files[file].raw_url}
              language={gist.files[file].language || "javascript"}
            />
          </div>
        ))}
        <p className="text-gray-500 mt-4">
          Created at: {new Date(gist.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Gist</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Edit Files:</h3>
              {Object.keys(editData.files).map((fileName) => (
                <div key={fileName} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {editData.files[fileName].filename}
                  </label>
                  <textarea
                    value={editData.files[fileName].content || ""}
                    onChange={(e) => handleFileChange(fileName, e)}
                    className="border p-2 w-full h-32"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GistDetails;
