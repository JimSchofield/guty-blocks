const Image =  function(props) {

    const { photo, galleryID } = props;
    const photoThumb = photo.sizes.medium || photo.sizes.thumbnail;

    return (
        <a href={photo.sizes.full.url} data-lightbox={galleryID} data-title="">
            <div style={{
                backgroundImage: `url(${photoThumb.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                paddingTop: '100%'
                }} alt="" />
        </a>
    );  
}

export { Image };