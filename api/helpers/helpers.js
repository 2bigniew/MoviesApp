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
  }
};

module.exports = helpers;
