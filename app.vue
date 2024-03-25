<template>
  <div>
    <button id="btn">Send cookie</button>
    <span>Cookie:</span><span>{{ data }}</span>
  </div>
</template>

<script lang="ts" setup>
const data = ref()

const message = (data: object) => {
  // window.parent.postMessage(document.cookie, "*");
  window.parent.postMessage(JSON.stringify(data), "*");
}

function doThingsWithCookies (status: string) {
  data.value = document.cookie;
  message({ event: 'SAA', cookie: document.cookie, status })
}

async function handleCookieAccess () {
  if (!document.hasStorageAccess) {
    // This browser doesn't support the Storage Access API
    // so let's just hope we have access!
    doThingsWithCookies('not-supported');
  } else {
    const hasAccess = await document.hasStorageAccess();
    if (hasAccess) {
      // We have access to third-party cookies, so let's go
      doThingsWithCookies('granted');
    } else {
      // Check whether third-party cookie access has been granted
      // to another same-site embed
      try {
        const permission = await navigator.permissions.query({
          name: "storage-access" as PermissionName,
        });

        if (permission.state === "granted") {
          // If so, you can just call requestStorageAccess() without a user interaction,
          // and it will resolve automatically.
          await document.requestStorageAccess();
          doThingsWithCookies('granted');
        } else if (permission.state === "prompt") {
          doThingsWithCookies("prompt");
          // Need to call requestStorageAccess() after a user interaction
          // const $btn = document.querySelector('#btn')
          // $btn.addEventListener("click", async () => {
          //   try {
          //     await document.requestStorageAccess();
          //     doThingsWithCookies();
          //   } catch (err) {
          // If there is an error obtaining storage access.
          //     console.error(`Error obtaining storage access: ${err}.
          //                   Please sign in.`);
          //   }
          // });
        } else if (permission.state === "denied") {
          doThingsWithCookies('denied')
        }
      } catch (error) {
        console.log(`Could not access permission state. Error: ${error}`);
        doThingsWithCookies('denied'); // Again, we'll have to hope we have access!
      }
    }
  }
}

onMounted(() => {
  handleCookieAccess();
})
</script>
