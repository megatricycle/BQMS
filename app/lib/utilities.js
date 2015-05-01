Number.prototype.ticketFormat = function(){
  return ('0000' + this.toString()).substring(this.toString().length, this.toString().length + 4);
}
