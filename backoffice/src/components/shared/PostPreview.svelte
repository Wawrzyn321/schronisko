<script lang="ts">
  import type { Settings } from '.prisma/client';

  import { notifyError } from '../../contexts/notification.context';
  import { settingsService } from '../../services/SettingsService';
  import { containsSubsitution, substitute } from '../../services/substitutions';

  export let title: string;
  export let source: string;

  let settings: Settings[];
  let isLoading = false;

  $: if (containsSubsitution(source) && !settings && !isLoading) {
    (async () => {
      try {
        isLoading = true;
        settings = await settingsService.get();
      } catch (e) {
        notifyError({
          message: 'Nie można pobrać podstawień: ' + e.message,
        });
      } finally {
        isLoading = false;
      }
    })();
  }
</script>

<div class="preview">
  <h1 class="title">{title}</h1>
  {@html substitute(source, settings)}
</div>

<style lang="scss">
  .preview .title {
    margin-bottom: 16px;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>
