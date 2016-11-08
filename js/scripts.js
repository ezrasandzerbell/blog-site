//backend logic
var Bio = function (avatarURL, avatarPhoto, fullName, nameArr, bioText, userName, city, state){
  this.avatarURL = avatarURL;
  this.avatarPhoto = avatarPhoto;
  this.fullName = fullName;
  this.nameArr = [];
  this.bioText = bioText;
  this.userName = userName;
  this.city = city;
  this.state = state;
};
Bio.prototype={
  constructor: Bio,
  getFullName: function(){
    this.fullName = this.nameArr[0] + " " + this.nameArr[1];
  },
  addImgTag: function(){
    this.avatarPhoto = '<img src ="' + this.avatarURL + '" >';
  }
};

var User = function(bio, blogEntries, blogTitle){
  this.bio = new Bio();
  this.blogEntries = [];
  this.blogTitle = blogTitle;
};

var BlogEntry = function(entryTitle, photos, entryText, entryTags, blogAsString) {
  this.entryTitle = entryTitle;
  this.photos = photos;
  this.entryText = entryText;
  this.entryTags = [];
  this.asString = blogAsString;
  this.tagsAsStr = "";
};

BlogEntry.prototype={
  constructor: BlogEntry,

  getEntryTags: function(){

    for (i=0; i<this.entryTags.length; i++){
      if(i===this.entryTags.length-1){
      this.tagsAsStr += "<span class='blogTagID'>" + this.entryTags[i] + "</span>";
      }
      else {
      this.tagsAsStr += "<span class='blogTagID'>" + this.entryTags[i] + "</span>" + ", ";
      };
    };
  },

  toString: function(idNum){

    this.asString = '<div id="blogEntry' + idNum + '"><h3>' + this.entryTitle + '</h3><br><br><img src = "' + this.photos + '" alt = "blog' + idNum + ' photo"><br><br><p>' + this.entryText + '</p><br>' + this.tagsAsStr + '<br><br>' + '--------------------------HR----------------------------' + '<br><br>';
  }

};
var addTags = function(tags) {
  this.blogEntry.extraTags = tags;
}

//frontend logic
$(document).ready(function(){

    var text_max = 250;
    $('#count_message').html(text_max + ' remaining');

    $('#text').keyup(function() {
      var text_length = $('#text').val().length;
      var text_remaining = text_max - text_length;

      $('#count_message').html(text_remaining + ' remaining');
    });


  var user = new User();

  var showSidebarInput = function(){
    $(".userName").text(user.bio.userName);
    $(".avatarImg").html(user.bio.avatarPhoto);
    $(".fullName").text(user.bio.fullName);
    $(".location").text(user.bio.city + ", " + user.bio.state);
    $(".bio").text(user.bio.bioText);
    // $("#sidebarBlogList").prepend();
  };

  $("#userRegister").submit(function(event){
    event.preventDefault();
    user.bio.nameArr[0] = $(".first-name").val();
    user.bio.nameArr[1] = $(".last-name").val();
    user.bio.blogTitle = $(".blogTitle").val();
    user.bio.userName = $(".userName").val();
    user.bio.bioText = $(".bio").val();
    user.bio.avatarURL = $(".avatar").val();
    user.bio.city = $(".city").val();
    user.bio.state = $(".state").val();
    user.bio.getFullName();
    user.bio.addImgTag();
    $("#landingPage").hide();
    $("#mainblog").show();
    $("#userSidebar").show();
    showSidebarInput();
    console.log(user);
  });

  $("#add-blogTag").click(function() {
    $(".justTags").append('<input type="text" class="form-control blogEntryTags">' +
                             '<br>');
  });

  $(".blogEntryForm").submit(function(event){
    event.preventDefault();
    var entryTitle = $(".blogEntryTitle").val();
    var photos = $(".blogEntryImage").val();
    var entryText = $(".blogEntryContent").val();
    var blogEntry = new BlogEntry(entryTitle, photos, entryText);

    $(".blogEntryTags").each(function() {
      var entryTag = $(this).val();
      blogEntry.entryTags.push(entryTag);
    });
    blogEntry.getEntryTags();
    blogEntry.toString(user.blogEntries.length-1);

    user.blogEntries.push(blogEntry);
    console.log(user);
    $(".allBlogEntries").prepend(blogEntry.asString);
    $(".blogEntryForm").hide();

  });

});
