<template>
  <div class="click-area">
    <!-- <button id="btn">Send cookie</button> -->
  </div>
</template>

<script lang="ts" setup>
const $area  = document.querySelector('.click-area')
const message = (data: object) => {
  // window.parent.postMessage(document.cookie, "*");
  window.parent.postMessage(JSON.stringify(data), "*");
};

function doThingsWithCookies (status: string) {
  message({ event: "SAAStatus", cookie: document.cookie, status });
}

$area.onclick = async () => {
  message({ event: "SAAClick", status: 'start' });
  await document.requestStorageAccess();
  message({ event: "SAAClick", status: 'end' });
}

const onClick = async () => {
  message({ event: "SAAClick", status: 'start' });
  try {
    await document.requestStorageAccess();
    message({ event: "SAAClick", status: 'end' });
    doThingsWithCookies('granted');
  } catch (err) {
    message({ event: "SAAClick", status: 'end' });
    doThingsWithCookies('denied');
  }
};

async function handleCookieAccess () {
  if (!document.hasStorageAccess) {
    // This browser doesn't support the Storage Access API
    // so let's just hope we have access!
    doThingsWithCookies("not-supported");
  } else {
    const hasAccess = await document.hasStorageAccess();
    if (hasAccess) {
      // We have access to third-party cookies, so let's go
      doThingsWithCookies("granted");
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
          doThingsWithCookies("granted");
        } else if (permission.state === "prompt") {
          doThingsWithCookies("prompt");

        } else if (permission.state === "denied") {
          doThingsWithCookies("denied");
        }
      } catch (error) {
        console.log(`Could not access permission state. Error: ${error}`);
        // safari try fix?
        doThingsWithCookies("prompt"); // Again, we'll have to hope we have access!
      }
    }
  }
}

onMounted(() => {
  handleCookieAccess();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.click-area {
  width: 100vw;
  height: 100vh;
}
</style>
