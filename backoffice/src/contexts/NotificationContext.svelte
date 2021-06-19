<script lang="ts">
  import { Toast } from 'svelma';
  import type { NotifyParams } from './notification.context';
  import { notificationQueue, dropFirst } from './notification.context';

  function showNotification(params: NotifyParams) {
    Toast.create(params);
  }

  notificationQueue.subscribe((queue) => {
    if (queue.length) {
      showNotification(queue[0]);
      dropFirst();
    }
  });
</script>

<slot />
