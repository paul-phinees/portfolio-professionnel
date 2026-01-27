"""
ASGI config for agricultural_decision_support project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agricultural_decision_support.settings')

application = get_asgi_application()

