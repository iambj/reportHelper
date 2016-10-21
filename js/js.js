////////////////
/*TODO:
- no last space in data (when pasting into textarea)
x fix spaces   percents

////
*/

//use an associative array to make comparing simple.
//global vars for simplicity... yes I know...
var vals = [];
var data;
var dataArr = [];

//Thresholds hard coded
var defTholds = {
  ACS	:	0.05,
  BL	:	0.1,
  INDEX	:	0.3,
  LS	:	0.05,
  MMC	:	0.1,
  MMS	:	0.2,
  MM	:	0.1,
  OSGC	:	0.1,
  OSGS	:	0.2,
  RPG	:	0.05,
  SALC	:	0.1,
  SALS	:	0.2,
  SAL	:	0.1,
  STORE	:	0.05,
  UNF	:	null,
  ITDC	:	null,
  UIL	:	null,
  USK	:	null,
  UNKNOWN	:	0.2,
  VAULT	:	0.1,
  VRF	:	0.05
}

//normalise percents to whole number percents
for(var p in defTholds){
    if(defTholds[p] != null){
      defTholds[p] *= 100;
     // _p(tholds[p] , true);
    }
}

//Gets the values from the array of strings of error % (data)
//Modifies global vals associative array.
function data2array(d){
  for(var i = 0; i < d.length-1; i++){
    error = getErr(d[i].trim());
    val = getVal(d[i].trim());
    vals[error] = val;
  }
}

//extracts the error from the string
function getErr(e){
    err = e.substr(0, e.indexOf(' '));
    return err;
}
//extracts the percent from the string
function getVal(v){
    return val = v.substr(v.indexOf(' ')+1);
}


//Main printing function.
//Prints out the finalised list, ready for email.
function printBoth(data, tholds){
    res = document.getElementById("results")
    res.innerHTML = "";
    html = "";
    for(var i in data){
        if(data.hasOwnProperty(i)){
          //document.write(i + "<br />");
            if(tholds[i] == null){
                if(data[i] >= 100){
                    html += '<span style="background-color: yellow">ERROR ' + i + " ==> %" + data[i].trim();
                    html += " no threshold";
                    html += " but high error rate";
                }else{
                    html += 'ERROR ' + i + " ==> %" + data[i].trim();
                }
                    html += "</span>";
            }else if(data[i] >= (tholds[i])){
                html += "<span style='background-color: yellow'>";
                html += "ERROR " + i + " ==> %" + data[i].trim();
                html += "</span>";
                html += " (" + tholds[i] + "% threshold)";
            }else{
                html += "ERROR " + i + " ==> %" + data[i].trim();
            }
                html += "<br />";
        }
    }
    res.innerHTML += html;
    _select("resultsHidden").value = html;
    dataSelect();
}



function formatBtn(){
    //grab data from the input
    data = _select("errors").value;
    //get rid of the crap we don't need (formatting)
    //-ERROR, -%, -==>
    data = data.replace(/ERROR/g, "").replace(/\=\=\>/g, "").replace(/\%/g ,"");
    dataArr = data.split("\n");
    data2array(dataArr);
    printBoth(vals, defTholds);
}
//Bind the button to the function.
_select("format").addEventListener("click", formatBtn);

//select and cache an object on the page by ID.
// returns the object it found or null;
function _select(sel){
    obj = document.getElementById(sel);
    if(!obj){
        obj = "No DOM element found.";
    }
    return obj;
}



function dataSelect(){
    res = _select("resultsHidden");
    res.select();
    window.clipboardData.setData('text/html');
    document.execCommand("copy");
}
