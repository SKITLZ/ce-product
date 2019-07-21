<template>
<div class="form-group">
    <label :for="name">{{ label }}<span class="text-danger" v-if="required"> *</span></label>
    <input class="form-control" :id="name" :type="type" :value="value" @input="$emit('input', $event.target.value)" :step="step" :min="min" :max="max" :placeholder="placeholder" :required="required">
    <template v-if="errors">
        <p class="text-danger mb-0" v-for="(error, index) in errors" :key="index">{{error}}</p>
    </template>
</div>
</template>

<script>
export default {
    props: {
        label: String,
        name: String,
        type: {
            type: String,
            default: 'text'
        },
        value: [String, Number],
        step: Number,
        min: Number,
        max: Number,
        placeholder: String,
        required: [String, Boolean],
        errors: [Object, Array],
    }
}
</script>
