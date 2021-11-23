export default {
  install: (app) => {
    function inView(el) {
      el.classList.add('inview');
      el.dispatchEvent(new CustomEvent('inView'));
    }

    const config = {
      rootMargin: '200px 0px 200px 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inView(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);

    // use v-observe on component
    app.directive('observe', {
      mounted(el, binding) {
        const callback = binding.value;
        if (observer) observer.observe(el);
        el.addEventListener('inView', () => {
          if (callback) callback();
        });
      },
      unMounted(el) {
        el.removeEventListener('inView');
      },
    });
  },
};
