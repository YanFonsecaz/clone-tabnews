function status(request, response) {
  response.status(200).json({ status: "ok" });
}

exports.default = status;
