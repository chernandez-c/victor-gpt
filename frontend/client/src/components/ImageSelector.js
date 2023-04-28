import React from 'react';

function ImageList(props) {
const imageList = props.images.map((image) => {
    //return <img src={image} alt="image" />;
    return <img src={image} alt="" />;
});

return (
    <div>
    {imageList}
    </div>
);
}

const images = [
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
];


  const ImageSelector = () => {
    return (
        <div>
          <ImageList images={images} />
        </div>
      );
};

export default ImageSelector;
