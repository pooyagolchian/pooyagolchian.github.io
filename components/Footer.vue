<template>
  <div class="col-12 pt-20 pb-20">
    <div class="container">
      <div class="row justify-content-between pt-30">
        <div class="col-auto p-0 text-sm-center">
          <ul class="footer-social">
            <li class="pl-0">
              <a
                class="col-auto pl-0 app-title font-weight-light fs-12"
                href="https://github.com/pooyagolchian"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              <a
                class="col-auto app-title font-weight-light fs-12"
                href="https://linkedin.com/in/pooyagolchian"
                target="_blank"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                class="col-auto app-title font-weight-light fs-12"
                href="https://dribbble.com/pooyagolchian"
                target="_blank"
              >
                Dribbble
              </a>
            </li>
            <li>
              <a
                class="col-auto app-title font-weight-light fs-12"
                href="https://dev.to/pooyagolchian"
                target="_blank"
              >
                Dev
              </a>
            </li>

            <li>
              <a
                class="col-auto app-title font-weight-light fs-12"
                href="/blog/rss.xml"
                target="_blank"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>

        <div class="app-subtitle fs-12 col-auto d-flex align-items-center p-0">
          Develop with ♥️ - {{ new Date().getFullYear() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer-social {
  display: flex;
  flex-direction: row;
  li {
    list-style: none;

    a {
      padding: 0 7px;
    }
  }
}
</style>
