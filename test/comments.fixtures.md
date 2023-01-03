# Comment Formatting

## [magic comments]: preserves and separates with a newline

Before:

```ruby
# frozen_string_literal: true
# encoding: big5
class Thing
  attr_reader :name
end
```

After:

```ruby
# frozen_string_literal: true
# encoding: big5

class Thing
  attr_reader :name
end
```

## In an empty method definition preserves comments

Before:

```ruby
# what about this?
def update
  # go over properties in user record in params and update if changed or nil
  # user.save
end
# trailing
```

After:

```ruby
# what about this?
def update
  # go over properties in user record in params and update if changed or nil
  # user.save
end
# trailing
```

## Around heredocs

Before:

```ruby
<<~HERE # foo
  foo
HERE
```

After:

```ruby
# foo
<<~HERE
  foo
HERE
```

## Around heredocs as a method arg

Before:

```ruby
list << <<~HERE # foo
  foo
HERE
```

After:

```ruby
# foo
list << <<~HERE
  foo
HERE
```

## Trailing an if condition

Before:

```ruby
if format.nil? # If no format is specified, parse the value as-is
  DateTime.parse(value.to_s)
else # If format is specified, pass to strptime
  DateTime.strptime(value.to_s, format)
end
```

After:

```ruby
if format.nil?
  # If no format is specified, parse the value as-is
  DateTime.parse(value.to_s)
else
  # If format is specified, pass to strptime
  DateTime.strptime(value.to_s, format)
end
```

## Trailing a send

Before:

```ruby
logger.info "API: REQUESTING ENDPOINT__" # to track request rates

::Client.query(:new)
```

After:

```ruby
logger.info "API: REQUESTING ENDPOINT__" # to track request rates

::Client.query(:new)
```
