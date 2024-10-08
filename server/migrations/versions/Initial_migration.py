"""Initial migration

Revision ID: 520791ee9720
Revises: 
Create Date: 2024-07-10 23:24:26.783490

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '520791ee9720'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('speakers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('phone_number', sa.String(length=10), nullable=False),
    sa.Column('image', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('events',
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('location', sa.String(length=200), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['created_by'], ['users.user_id'], name=op.f('fk_events_created_by_users')),
    sa.PrimaryKeyConstraint('event_id')
    )
    op.create_table('event_speakers',
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('speaker_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.event_id'], name=op.f('fk_event_speakers_event_id_events')),
    sa.ForeignKeyConstraint(['speaker_id'], ['speakers.id'], name=op.f('fk_event_speakers_speaker_id_speakers')),
    sa.PrimaryKeyConstraint('event_id', 'speaker_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('event_speakers')
    op.drop_table('events')
    op.drop_table('users')
    op.drop_table('speakers')
    # ### end Alembic commands ###
