// test to see if string(url) is an image url
export const isUriImage = function(uri) {
  // //make sure we remove any nasty GET params 
  uri = uri.split('?')[0];
  //moving on, split the uri into parts that had dots before them
  const parts = uri.split('.');
  //get the last part ( should be the extension )
  const extension = parts[parts.length-1];
  //define some image types to test against
  const imageTypes = ['jpg','jpeg','tiff','png','gif','bmp'];
  //check if the extension matches anything in the list.
  if(imageTypes.indexOf(extension) !== -1) {
      return true;   
  }
}

// extract youtube id from all sorts of endpoints
export const youtube_parser =  function (url){
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

// convert a video embed link (youtube) into a preview image
export const convertVid = function(path) {
  
  const videoId = youtube_parser(path);
  let imageURL = "../images/noFind.png";
  if(videoId) {
      imageURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // get the image URL
      // webp format: const imageURL = `https://img.youtube.com/vi_webp/${videoId}/hqdefault.webp`;
  } 
  return imageURL;

}

