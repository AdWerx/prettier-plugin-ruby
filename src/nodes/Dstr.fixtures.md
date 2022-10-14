# Dstr Formatting

## Formats

Before:

```ruby
"#{ foo }"
```

After:

```ruby
"#{foo}"
```

## Formats recursively

Before:

```ruby
"#{"#{"#{foo}"}"}"
```

After:

```ruby
"#{"#{"#{foo}"}"}"
```

## Formats members of an array

Before:

```ruby
%W(#{foo}    #{bar}
 #{baz})
```

After:

```ruby
%W(#{foo} #{bar} #{baz})
```
