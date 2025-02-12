<script setup lang="ts">
import type { ManualPriceFormPayload } from '@/types/prices';

const props = withDefaults(
  defineProps<{
    editMode: boolean;
    value?: Partial<ManualPriceFormPayload> | null;
    disableFromAsset?: boolean;
  }>(),
  {
    disableFromAsset: false,
    value: null,
  },
);

const emptyPrice: () => ManualPriceFormPayload = () => ({
  fromAsset: '',
  toAsset: '',
  price: '',
});

const form = ref<ManualPriceFormPayload>(emptyPrice());

const { value, editMode } = toRefs(props);

watchImmediate(value, (value) => {
  if (value)
    set(form, { ...emptyPrice(), ...value });
});

const { openDialog, submitting, closeDialog, setSubmitFunc, trySubmit, stateUpdated } = useLatestPriceForm();

const { t } = useI18n();

const { save } = useLatestPrices(t);

onMounted(() => {
  setSubmitFunc(() => save(get(form), get(editMode)));
});
</script>

<template>
  <BigDialog
    :display="openDialog"
    :title="editMode ? t('price_management.dialog.edit_title') : t('price_management.dialog.add_title')"
    :loading="submitting"
    :prompt-on-close="stateUpdated"
    @confirm="trySubmit()"
    @cancel="closeDialog()"
  >
    <LatestPriceForm
      v-model="form"
      :edit="editMode"
      :disable-from-asset="disableFromAsset"
    />
  </BigDialog>
</template>
