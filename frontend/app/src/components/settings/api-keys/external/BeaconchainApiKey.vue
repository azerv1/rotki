<script setup lang="ts">
import type ServiceKey from '@/components/settings/api-keys/ServiceKey.vue';

const name = 'beaconchain';

const { t } = useI18n();

const { loading, apiKey, actionStatus, save, confirmDelete } = useExternalApiKeys(t);
const { serviceKeyRef, saveHandler } = useServiceKeyHandler<InstanceType<typeof ServiceKey>>();

const key = apiKey(name);
const status = actionStatus(name);
</script>

<template>
  <ServiceKeyCard
    rounded-icon
    :key-set="!!key"
    :title="t('external_services.beaconchain.title')"
    :subtitle="t('external_services.beaconchain.description')"
    image-src="./assets/images/services/beaconchain.svg"
    :primary-action="key
      ? t('external_services.replace_key')
      : t('external_services.save_key')"
    :action-disabled="!serviceKeyRef?.currentValue"
    @confirm="saveHandler()"
  >
    <template #left-buttons>
      <RuiButton
        :disabled="loading || !key"
        color="error"
        variant="text"
        @click="confirmDelete(name)"
      >
        <template #prepend>
          <RuiIcon
            name="delete-bin-line"
            size="16"
          />
        </template>
        {{ t('external_services.delete_key') }}
      </RuiButton>
    </template>
    <ServiceKey
      ref="serviceKeyRef"
      hide-actions
      :api-key="key"
      :name="name"
      :data-cy="name"
      :label="t('external_services.api_key')"
      :hint="t('external_services.beaconchain.hint')"
      :loading="loading"
      :status="status"
      @save="save($event)"
    />
  </ServiceKeyCard>
</template>
