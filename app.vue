<template>
  <div>
    <button id="btn">Send cookie</button>
    <span>Cookie:</span><span>{{ data }}</span>
  </div>
</template>

<script lang="ts" setup>
const data = ref()

function doThingsWithCookies () {
  data.value = document.cookie;
}

async function handleCookieAccess () {
  if (!document.hasStorageAccess) {
    // This browser doesn't support the Storage Access API
    // so let's just hope we have access!
    doThingsWithCookies();
  } else {
    const hasAccess = await document.hasStorageAccess();
    if (hasAccess) {
      // We have access to third-party cookies, so let's go
      doThingsWithCookies();
    } else {
      // Check whether third-party cookie access has been granted
      // to another same-site embed
      try {
        const permission = await navigator.permissions.query({
          name: "storage-access",
        });

        if (permission.state === "granted") {
          // If so, you can just call requestStorageAccess() without a user interaction,
          // and it will resolve automatically.
          await document.requestStorageAccess();
          doThingsWithCookies();
        } else if (permission.state === "prompt") {
          // Need to call requestStorageAccess() after a user interaction
          const $btn = document.querySelector('#btn')
          $btn.addEventListener("click", async () => {
            try {
              await document.requestStorageAccess();
              doThingsWithCookies();
            } catch (err) {
              // If there is an error obtaining storage access.
              console.error(`Error obtaining storage access: ${err}.
                            Please sign in.`);
            }
          });
        } else if (permission.state === "denied") {
          // User has denied third-party cookie access, so we'll
          // need to do something else
        }
      } catch (error) {
        console.log(`Could not access permission state. Error: ${error}`);
        doThingsWithCookies(); // Again, we'll have to hope we have access!
      }
    }
  }
}

// $btn.onclick = async () => {
// Safari variant
// await document.requestStorageAccess();

// if (await document.hasStorageAccess()) {
//   window.parent.postMessage(document.cookie, "*");
// }

// Firefox
// if (await hasCookieAccess()) {
//   window.parent.postMessage(document.cookie, "*");
// }

// };

onMounted(() => {
  handleCookieAccess();
})
</script>
