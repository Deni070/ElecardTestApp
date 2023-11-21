import React, { useState } from 'react';
import Modal from 'react-modal';
import './TreeView.css'; // Файл стилей TreeView.css

const TreeView = ({ data }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const renderCategories = (categories) => {
        return categories.map((category, index) => (
            <li key={index}>
        <span
            className={`category ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
        >
          {category}
        </span>
                {selectedCategory === category ? renderFiles(category) : null}
            </li>
        ));
    };

    const renderFiles = (category) => {
        const files = data
            .filter((item) => item.category === category && !item.children)
            .map((file, index) => (
                <li key={index} className="file">
          <span className="file-thumbnail" onClick={() => openModal(file.image)}>
            <img className='TreeViewImage' src={`http://contest.elecard.ru/frontend_data/${file.image}`} alt={file.category} />
          </span>
                    <span className="file-details">
            <span className="file-name">{file.category}</span>
            <span>{formatSize(file.filesize)}</span>
            <span>{formatTimestamp(file.timestamp)}</span>
          </span>
                </li>
            ));

        return <ul className="files">{files}</ul>;
    };

    const formatSize = (size) => {
        const kilobytes = size / 1024;
        if (kilobytes < 1) {
            return size + ' B';
        } else if (kilobytes < 1024) {
            return kilobytes.toFixed(2) + ' KB';
        } else {
            const megabytes = kilobytes / 1024;
            return megabytes.toFixed(2) + ' MB';
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    return (
        <div>
            <ul className="tree root-tree">{renderCategories([...new Set(data.map((item) => item.category))])}</ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
            >
                <img src={`http://contest.elecard.ru/frontend_data/${selectedImage}`} alt="Full Size" />
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default TreeView;
