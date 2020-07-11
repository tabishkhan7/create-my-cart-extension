document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        chrome.storage.sync.set({"toggle":true}, function() {
          });
      } else {
        chrome.storage.sync.set({"toggle":false}, function() {
          });
      }
    });
  });