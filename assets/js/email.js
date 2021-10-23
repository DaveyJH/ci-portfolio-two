(function () {
  emailjs.init("user_e1cRASOtMmYn4fYfOkM9M");
})();

window.onload = function () {
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    /* | = bitwise OR 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR */
    this.contact_number.value = Math.random() * 100000 | 0;
    //convert github user to clickable link if input used
    let githubLink = document.getElementById("github-link");
    if (githubLink.value.length !== 0) {
      if (githubLink.value.includes("@")) {
        githubLink.value = githubLink.value.slice(githubLink.value.indexOf("@") + 1);
        githubLink.value = `github.com/${githubLink.value}`;
      } else if (!githubLink.value.includes("github.com/")) {
        githubLink.value = `github.com/${githubLink.value}`;
      }
    }
    console.log(githubLink);
    emailjs.sendForm('ci_p2_contact_service', 'ci_p2_form', this)
      .then(function () {
        alert('Thank you for your email.');
      }, function (error) {
        alert(`Unfortunately we have run into a little problem,\n
              your email failed to send...`);
      });
  });
};