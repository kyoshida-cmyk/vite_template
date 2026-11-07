$(function () {
  $('a[href^="#"], area[href^="#"]').on("click", function (e) {
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);

    if (!target.length) {
      console.warn("対象が存在しません:", href);
      return false;
    }

    const position = target.offset().top;

    $("html, body").animate(
      {
        scrollTop: position,
      },
      500,
      "swing",
    );

    return false;
  });
});
