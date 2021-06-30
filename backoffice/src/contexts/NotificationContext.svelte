<script lang="ts">
  import { Toast } from 'svelma';
  import type { NotifyParams } from './notification.context';
  import { notificationQueue, dropFirst } from './notification.context';

  function showNotification(params: NotifyParams) {
    if (params.type === 'is-danger' && !params.duration) {
      params.duration = 10000;
    }
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
