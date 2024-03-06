<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Información personal">
      <p class="message">
        
      </p>

      <ProfileUpdateForm @submit="updatePersonalData" />

      <p class="notice">
        Usa tus datos reales
        <a href="">Política de privacidad</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab title="Cambio de contraseña">
      <p class="message">
        Cambiar tu contraseña:<br />
        Tu dirección de correo actual es
        <span class="message__label">example@email.com</span>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/prestashop';

extend('email', {
  ...email,
  message: 'Correo inválido'
});

extend('required', {
  ...required,
  message: 'El campo es obligatorio'
});

extend('min', {
  ...min,
  message: 'Debe contener al menos {length} caracteres'
});

extend('password', {
  validate: value => String(value).length >= 8,
  message: 'La contraseña debe tener al menos 8 caracteres'
});

extend('confirmed', {
  ...confirmed,
  message: 'Las contraseñas no coinciden'
});

extend('nothavenumber', {
  validate: value => String(value).match(/^([^0-9]*)$/),
  message: 'Formato inválido - No puede contener un número'
});

export default {
  name: 'PersonalDetails',

  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser, changePassword } = useUser();

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({ current: form.value.currentPassword, new: form.value.newPassword, customQuery: form.value.currentUser }), onComplete, onError);

    return {
      updatePersonalData,
      updatePassword
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
