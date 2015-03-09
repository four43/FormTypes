// Generated by dts-bundle v0.2.0
// Dependencies for this module:
//   ../typings/generated/underscore/underscore.d.ts

declare module 'FormTypes' {
    import AbstractFormType = require('FormTypes/FormType/AbstractFormType');
    import FormType = require('FormTypes/FormType/FormType');
    import FieldType = require('FormTypes/FormType/FieldType');
    import TextType = require('FormTypes/FormType/TextType');
    import ChoiceType = require('FormTypes/FormType/ChoiceType');
    import OptionType = require('FormTypes/FormType/OptionType');
    var FormTypeExports: {
        AbstractFormType: typeof AbstractFormType;
        FormType: typeof FormType;
        FieldType: typeof FieldType;
        TextType: typeof TextType;
        ChoiceType: typeof ChoiceType;
        OptionType: typeof OptionType;
    };
    export = FormTypeExports;
}

declare module 'FormTypes/FormType/AbstractFormType' {
    import FormTypeOptionsInterface = require('FormTypes/Options/FormTypeOptionsInterface');
    import FormTemplateCollectionInterface = require('FormTypes/View/Template/FormTemplateCollectionInterface');
    import _ = require('underscore');
    import FormContextInterface = require('FormTypes/View/Context/FormContextInterface');
    class AbstractFormType {
            el: HTMLElement;
            protected options: FormTypeOptionsInterface;
            protected templates: FormTemplateCollectionInterface;
            protected children: AbstractFormType[];
            protected Handlebars: HandlebarsStatic;
            protected eventEmitter: NodeJS.EventEmitter;
            protected isRenderedFlag: boolean;
            protected listeners: _.Dictionary<any>;
            protected listenerId: string;
            constructor(options?: FormTypeOptionsInterface);
            addChild(child: AbstractFormType): void;
            removeChild(name: string): void;
            getChild(name: string): AbstractFormType;
            render(): AbstractFormType;
            protected appendChildType(childType: AbstractFormType): void;
            /**
                * Remove a childType from the form's element
                * @param childType
                */
            protected removeChildType(childType: AbstractFormType): void;
            setTemplates(templates: FormTemplateCollectionInterface): void;
            protected setDefaultTemplates(templates?: FormTemplateCollectionInterface): void;
            protected createTemplateContext(): FormContextInterface;
            /**
                * Apply defaults to the options object.
                *
                * The returned object is set to this.options.
                */
            protected setDefaultOptions(options: FormTypeOptionsInterface): FormTypeOptionsInterface;
            protected createElementFromString(htmlString: string): HTMLElement;
            getName(): string;
            /**
                * Returns the element which is bound to the form.
                * For example, for a TextType, this would be the <input type="text" />
                * element.
                */
            getFormElement(): HTMLElement;
            isRendered(): boolean;
            getData(): any;
            setData(data: any): void;
            on(event: string, listener: Function, listenerId?: string): void;
            once(event: string, listener: Function, listenerId?: string): void;
            removeListener(event: string, listener: Function): void;
            removeAllListeners(event?: string): void;
            /**
                * When you bind to an event, you may optionally
                * specify a listenerId. This method removes all
                * listeners for that listenerId.
                *
                * @param listenerId
                */
            removeAllListenersById(listenerId: any): void;
    }
    export = AbstractFormType;
}

declare module 'FormTypes/FormType/FormType' {
    import AbstractFormType = require('FormTypes/FormType/AbstractFormType');
    import _ = require('underscore');
    class FormType extends AbstractFormType {
        getData(): _.Dictionary<any>;
        setData(data: _.Dictionary<any>): void;
    }
    export = FormType;
}

declare module 'FormTypes/FormType/FieldType' {
    import AbstractFormType = require('FormTypes/FormType/AbstractFormType');
    import FieldTypeOptionsInterface = require('FormTypes/Options/FieldTypeOptionsInterface');
    /**
      * Base class for all form fields
      */
    class FieldType extends AbstractFormType {
        protected setDefaultOptions(options: FieldTypeOptionsInterface): FieldTypeOptionsInterface;
    }
    export = FieldType;
}

declare module 'FormTypes/FormType/TextType' {
    import FieldType = require('FormTypes/FormType/FieldType');
    import FieldTypeOptionsInterface = require('FormTypes/Options/FieldTypeOptionsInterface');
    class TextType extends FieldType {
        render(): TextType;
        protected setDefaultOptions(options: FieldTypeOptionsInterface): FieldTypeOptionsInterface;
        getData(): string;
        setData(data: string): void;
    }
    export = TextType;
}

declare module 'FormTypes/FormType/ChoiceType' {
    import AbstractFormType = require('FormTypes/FormType/AbstractFormType');
    import FieldType = require('FormTypes/FormType/FieldType');
    import ChoiceTypeOptionsInterface = require('FormTypes/Options/ChoiceTypeOptionsInterface');
    class ChoiceType extends FieldType {
        render(): ChoiceType;
        protected appendChildType(childType: AbstractFormType): void;
        protected setDefaultOptions(options: ChoiceTypeOptionsInterface): ChoiceTypeOptionsInterface;
        getData(): string;
        setData(data: string): void;
    }
    export = ChoiceType;
}

declare module 'FormTypes/FormType/OptionType' {
    import FieldType = require('FormTypes/FormType/FieldType');
    import OptionTypeOptionsInterface = require('FormTypes/Options/OptionTypeOptionsInterface');
    class OptionType extends FieldType {
        protected setDefaultOptions(options: OptionTypeOptionsInterface): OptionTypeOptionsInterface;
    }
    export = OptionType;
}

declare module 'FormTypes/Options/FormTypeOptionsInterface' {
    import AbstractFormType = require('FormTypes/FormType/AbstractFormType');
    import FormTemplateCollectionInterface = require('FormTypes/View/Template/FormTemplateCollectionInterface');
    interface FormTypeOptionsInterface extends _.Dictionary<any> {
            type?: string;
            /**
                * A unique name for the form type instance.
                * This may also serve as the form elements `name` attribute,
                * where applicable.
                */
            name?: string;
            /**
                * HTML tag name for the form element.
                */
            tagName?: string;
            /**
                * Attributes to apply to the HTML element
                */
            attrs?: _.Dictionary<any>;
            /**
                * Child form elements.
                */
            children?: AbstractFormType[];
            data?: any;
            templates?: FormTemplateCollectionInterface;
    }
    export = FormTypeOptionsInterface;
}

declare module 'FormTypes/View/Template/FormTemplateCollectionInterface' {
    import TemplateCollectionInterface = require('FormTypes/View/Template/TemplateCollectionInterface');
    import TemplateInterface = require('FormTypes/View/Template/TemplateInterface');
    interface FormTemplateCollectionInterface extends TemplateCollectionInterface {
        /**
          * The main form template.
          * Serves as an entry point for all other templates.
          */
        form: TemplateInterface;
        form_start: TemplateInterface;
        form_rows: TemplateInterface;
        form_end: TemplateInterface;
        html_attrs: TemplateInterface;
}

declare module 'FormTypes/View/Context/FormContextInterface' {
    interface FormContextInterface extends _.Dictionary<any> {
            /**
                * A unique name for the form type instance.
                * This may also serve as the form elements `name` attribute,
                * where applicable.
                */
            name: string;
            type: string;
            /**
                * HTML tag name for the form element.
                */
            tagName: string;
            /**
                * Attributes to apply to the HTML element
                */
            attrs: _.Dictionary<string>;
            /**
                * Child form elements.
                */
            children: FormContextInterface[];
    }
    export = FormContextInterface;
}

declare module 'FormTypes/Options/FieldTypeOptionsInterface' {
    import FormTypeOptionsInterface = require('FormTypes/Options/FormTypeOptionsInterface');
    import _ = require('underscore');
    interface FieldTypeOptionsInterface extends FormTypeOptionsInterface {
        label?: string;
        labelAttrs?: _.Dictionary<string>;
    }
    export = FieldTypeOptionsInterface;
}

declare module 'FormTypes/Options/ChoiceTypeOptionsInterface' {
    import FieldTypeOptionsInterface = require('FormTypes/Options/FieldTypeOptionsInterface');
    interface ChoiceTypeOptionsInterface extends FieldTypeOptionsInterface {
        /**
          * A hash of choice values -> labels
          * eg.
          * {
          *  us: 'United States',
          *  ca: 'Canada'
          * }
          */
        choices?: _.Dictionary<string>;
}

declare module 'FormTypes/Options/OptionTypeOptionsInterface' {
    import FieldTypeOptionsInterface = require('FormTypes/Options/FieldTypeOptionsInterface');
    interface OptionTypeOptionsInterface extends FieldTypeOptionsInterface {
}

declare module 'FormTypes/View/Template/TemplateCollectionInterface' {
    interface TemplateCollectionInterface extends _.Dictionary<any> {
    }
    export = TemplateCollectionInterface;
}

declare module 'FormTypes/View/Template/TemplateInterface' {
    interface TemplateInterface {
        (context: any, options?: any): string;
    }
    export = TemplateInterface;
}

