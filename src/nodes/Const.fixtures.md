# Const Formatting

## Formats a global constant

Before:

```ruby
::Global
```

After:

```ruby
::Global
```

## Formats a nested constant

Before:

```ruby
::Global::Path::To::My::Constant
```

After:

```ruby
::Global::Path::To::My::Constant
```

## Breaks a constant when necessary

Before:

```ruby
::Global::LongPath::ToThe::My::ConstantWithAnAbsurdlyLongNameThatExceedsPrintWidth
```

After:

```ruby
::Global::LongPath::ToThe::My::
  ConstantWithAnAbsurdlyLongNameThatExceedsPrintWidth
```
