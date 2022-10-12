# Undef Formatting

## Works

Before:

```ruby
undef mymethod
```

After:

```ruby
undef :mymethod
```

## Breaks when necessary

Before:

```ruby
undef mymethod, anothermethod, anotherlongermethod, thelongestmethodsofar, thatmethodthatpushestheprintwidth
```

After:

```ruby
undef :mymethod,
  :anothermethod,
  :anotherlongermethod,
  :thelongestmethodsofar,
  :thatmethodthatpushestheprintwidth
```
