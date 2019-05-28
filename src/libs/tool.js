export default {
  formatSize(filesize){
    if(null==filesize||filesize==''){
      return "0 Bytes";
    }
    var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    var index=0;
    var srcsize = parseFloat(filesize);
    index=Math.floor(Math.log(srcsize)/Math.log(1024));
    var size =srcsize/Math.pow(1024,index);
    size=size.toFixed(2);//保留的小数位数
    return size+unitArr[index];
  },
  formatSpeed(filesize){
    if(null==filesize||filesize==''){
      return "0 Bytes";
    }
    var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    var index=0;
    var srcsize = parseFloat(filesize);
    index=Math.floor(Math.log(srcsize)/Math.log(1024));
    var size =srcsize/Math.pow(1024,index);
    size=size.toFixed(2);//保留的小数位数
    return size+unitArr[index] + " / s";
  },
  extensions() {
    return "txt,avi,rar,doc,wps,jpg,jpeg,gif,bmp,png,swf,psd,wav,mp3,midi,avi,mpg,mpeg,mov,rm,rmvb,zip,rar,7z,xls,exe,ipa,apk,dmg,msi,dll,rm,asp,java,xml,jpg";
  }
}
