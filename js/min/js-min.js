function data2array(t){for(var e=0;e<t.length;e++)error=getErr(t[e].trim()),val=getVal(t[e].trim()),vals[error]=val}function getErr(t){return err=t.substr(0,t.indexOf(" ")),err}function getVal(t){return val=t.substr(t.indexOf(" ")+1)}function printBoth(t,e){res=document.getElementById("results"),res.innerHTML="",html="";for(var r in t)t.hasOwnProperty(r)&&(null==e[r]?(t[r]>=100?(html+='<span style="background-color: yellow">ERROR '+r+" ==> %"+t[r].trim(),html+=" no threshold",html+=" but high error rate"):html+="ERROR "+r+" ==> "+t[r].trim()+"%",html+="</span>"):t[r]>=e[r]?(html+="<span style='background-color: yellow'>",html+="ERROR "+r+" ==> "+t[r].trim()+"%",html+="</span>",html+=" ("+e[r]+"% threshold)"):html+="ERROR "+r+" ==> "+t[r].trim()+"%",html+="<br />");res.innerHTML+=html}function formatBtn(){return dataArr=[],data=null,vals=[],(data=_select("errors").value)?(data=data.replace(/ERROR/g,"").replace(/\=\=\>/g,"").replace(/\%/g,""),dataArr=data.split("\n"),data2array(dataArr),void printBoth(vals,defTholds)):void console.log("kill")}function _select(t){return obj=document.getElementById(t),obj||(obj="No DOM element found."),obj}function dataSelect(){res=_select("resultsHidden"),res.select(),window.clipboardData.setData("text/html"),document.execCommand("copy")}function autoFormat(){_select("results").innerHTML="",formatBtn()}function clearResults(){_select("results").innerHTML="",_select("errors").value=""}var vals=[],data,dataArr=[],defTholds={ACS:.05,BL:.1,INDEX:.3,LS:.05,MMC:.1,MMS:.2,MM:.1,OSGC:.1,OSGS:.2,RPG:.05,SALC:.1,SALS:.2,SAL:.1,STORE:.05,UNF:null,ITDC:null,UIL:null,USK:null,UNKNOWN:.2,VAULT:.1,VRF:.05};for(var p in defTholds)null!=defTholds[p]&&(defTholds[p]*=100);_select("format").addEventListener("click",formatBtn),_select("errors").addEventListener("input",autoFormat),_select("clear").addEventListener("click",clearResults);