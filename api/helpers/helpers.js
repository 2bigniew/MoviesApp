const helpers = {
  validateTitle: function(title){
    let titleArr = title.split('');
    let arr = [];
    titleArr.map( x => {
      if (x === " "){
        arr.push("_");
      } else {
        arr.push(x.toLowerCase());
      }
    });
    return arr.join('');
  },
  validateMovieId = function(movieId) {
    let MovieIdArr = movieId.split('');
    let arr = [];
    MovieIdArr.map( x => {
      if(parsenInt(x) === true){
        arr.push(x)
      }
    });
    return parseInt(arr.join(''));
  }
};

module.exports = helpers;
