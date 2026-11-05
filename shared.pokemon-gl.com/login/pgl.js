(function () {
  "use strict";

  var API_BASE = "/api/";
  var API_ENDPOINT = "pgl.top.login";

  function buildApiUrl(endpoint) {
    var params = new URLSearchParams();
    params.set("p", endpoint);
    params.set("now", Date.now().toString());
    return API_BASE + "?" + params.toString();
  }

  var LOGIN_SUCCESS_REDIRECT = "/";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("pgl-login-form");
    if (!form) return;

    var errorEl = document.getElementById("pgl-login-error");
    var submitBtn = form.querySelector(".pgl-login-button");
    var usernameInput = form.querySelector('input[name="username"]');
    var passwordInput = form.querySelector('input[name="password"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      handleLogin();
    });

    function setError(message) {
      if (!errorEl) return;
      if (message) {
        errorEl.textContent = message;
        errorEl.hidden = false;
      } else {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      form.classList.toggle("pgl-form--loading", isLoading);
    }

    function handleLogin() {
      setError(null);

      var username = usernameInput ? usernameInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value : "";

      if (!username || !password) {
        setError("Please enter both a user name and a password.");
        return;
      }

      var payload = new URLSearchParams();
      payload.set("lt", form.elements["lt"] ? form.elements["lt"].value : "");
      payload.set("_eventId", form.elements["_eventId"] ? form.elements["_eventId"].value : "submit");
      payload.set("username", username);
      payload.set("password", password);

      setLoading(true);

      fetch(buildApiUrl(API_ENDPOINT), {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: payload.toString()
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Login failed (HTTP " + response.status + ")");
          }
          return response.json().catch(function () {
            return {};
          });
        })
        .then(function (data) {
          if (data && data.error) {
            throw new Error(data.error);
          }
          window.top.location.href = LOGIN_SUCCESS_REDIRECT;
        })
        .catch(function (err) {
          setError(err.message || "Something went wrong logging in. Please try again.");
        })
        .finally(function () {
          setLoading(false);
        });
    }
  });
})();
