import React, { useState } from "react";

function FileUploadButton() {
  const [file, setFile] = useState(null);

  // handle file selection
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle file upload
  const handleSubmit = async () => {
    if (file) {
      // create a FormData object
      const formData = new FormData();
      formData.append("file", file);

      // send a POST request with fetch or axios
      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // trigger input click
  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        hidden
        onChange={handleChange}
      />
      <button onClick={handleClick}>Select File</button>
      <button onClick={handleSubmit}>Upload File</button>
    </div>
  );
}

export default FileUploadButton;