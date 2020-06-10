export class RegexEnum {
    public static postalCode = '^[0-9]{5}(?:-[0-9]{4})?$';
    public static names  = '^[a-zA-Z0-9\.\-]*';
    public static houseNumber  = '^[a-zA-Z0-9\-]*';
}
